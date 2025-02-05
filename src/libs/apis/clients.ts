import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    // 직접 헤더에서 가져와야 함
    const newAccessToken = response.headers['authorization'];

    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
    } else {
      throw new Error('새로운 액세스 토큰을 받아오지 못했습니다.');
    }

    return newAccessToken;
  } catch (error) {
    console.error('리프레시 토큰 요청 실패:', error);
    throw error;
  }
};

client.interceptors.request.use(
  (config) => {
    const authCodeApis = ['/auth/login/kakao', '/auth/login/google'];
    const isAuthCodeApi = authCodeApis.some((api) =>
      config.url?.startsWith(api),
    );

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
