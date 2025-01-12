import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '@/libs/apis/kakaoLogin.api';

const KakaoLoginLoading = () => {
  const nav = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const authCode = new URLSearchParams(window.location.search).get('code');

      if (!authCode) {
        console.error('Authorization code not found');
        return;
      }

      try {
        const { authorization, status } = await kakaoLogin(authCode);

        localStorage.setItem('accessToken', authorization);

        if (status === 'LOGIN') {
          nav('/home');
        } else if (status === 'UN_REGISTER') {
          nav('/signup/verification');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    handleLogin();
  }, [nav]);

  return <>로딩중...</>;
};

export default KakaoLoginLoading;
