import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 쿠키 추출해줄 함수
const getCookieValue = (key: string) => {
  const match = document.cookie.split('; ').find((row) => row.startsWith(key));
  return match ? match.split('=')[1] : null;
};

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

// refresh 사용해서 aceess 교체
const refreshAccessToken = async () => {
  try {
    const refreshToken = getCookieValue('refreshToken');
    if (!refreshToken) {
      throw new Error('리프레쉬 토큰이 쿠키에 없습니다!');
    }

    const response = await client.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (response) {
      const newAccessToken = response.headers['authorization'];

      if (!newAccessToken) {
        console.error('재설정할 쿠키가 포함되지 않았습니다!');
        return null;
      }

      return newAccessToken;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        `리프레쉬 토큰 요청에 문제가 발생했습니다! ${error.message}`,
      );
    } else {
      throw new Error(`axios 인스턴스에 포함되지 않는 에러입니다!`);
    }
  }
};

client.interceptors.request.use(
  (config) => {
    const isAuthCodeApi = config.url?.startsWith('/auth/login/kakao');

    if (!isAuthCodeApi) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => {
    if (
      response.config.url === '/auth/refresh' ||
      response.config.url === '/auth/login/google' ||
      response.config.url === '/auth/login/kakao'
    ) {
      const accessToken = response.headers['authorization'];

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        throw new Error('리프레쉬 토큰이 헤더에 담겨오지 않았습니다!');
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } else {
          return Promise.reject(`새로운 엑세스 토큰 발행에 실패했습니다!`);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default client;
