import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '@/libs/apis/kakaoLogin.api';
import LoadingScreen from '@/components/loading';

const KakaoLoginLoading = () => {
  const nav = useNavigate();
  useEffect(() => {
    const fetchAuthCode = async () => {
      const authCode = new URLSearchParams(window.location.search).get('code');

      if (!authCode) {
        console.log('Authorization code가 없습니다.');
        return;
      }

      try {
        const res = await kakaoLogin(authCode);

        const status = res.data.data;
        if (status === 'LOGIN_SUCCESS') {
          nav('/home');
        } else if (status === 'UN_REGISTER') {
          nav('/signup/verification');
        }
      } catch (error) {
        console.log('post 실패: ', error);
      }
    };

    fetchAuthCode();
  }, [nav]);

  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default KakaoLoginLoading;
