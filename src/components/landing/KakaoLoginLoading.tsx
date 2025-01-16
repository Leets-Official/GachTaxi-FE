import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoLoginLoading = () => {
  const nav = useNavigate();
  useEffect(() => {
    const fetchAuthCode = async () => {
      const authCode = new URLSearchParams(window.location.search).get('code');

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/login/kakao`,
          { authCode: authCode },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const accessToken = res.headers['authorization'];
        localStorage.setItem('accessToken', accessToken);

        const status = res.data.data.status;
        if (status === 'LOGIN') {
          nav('/dashboard');
        } else if (status === 'UN_REGISTER') {
          nav('/signup/verification');
        }
      } catch (error) {
        console.log('post 실패: ', error);
      }
    };

    fetchAuthCode();
  }, []);

  return <>로딩중...</>;
};

export default KakaoLoginLoading;
