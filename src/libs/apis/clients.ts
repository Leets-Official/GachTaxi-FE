import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 쿠키 추출해줄 함수
const getCookieValue = (key: string) => {
  const match = document.cookie.split('; ').find((row) => row.startsWith(key));
  return match ? match.split('=')[1] : null;
};

// 회원가입을 제외한 api 요청 시 사용할 인스턴스 객체
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
    const response = await client.post('/auth/refresh');

    if (response) {
      const refreshedAccessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken'))
        ?.split('=')[1];

      if (!refreshedAccessToken) {
        console.log('재설정할 쿠키가 포함되지 않았습니다!');
        return null;
      }

      return refreshedAccessToken;
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
    const accessToken = getCookieValue('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// 회원가입 시 사용할 인스턴스 객체
const registerClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

registerClient.interceptors.request.use(
  (config) => {
    const tempToken = getCookieValue('tempToken');
    if (tempToken) {
      config.headers.Authorization = `Bearer ${tempToken}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export { client, registerClient };
