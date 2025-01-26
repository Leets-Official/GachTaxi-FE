import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/loading';
import googlelogin from '@/libs/apis/googleLogin.api';

const GoogleLoginLoading = () => {
  const nav = useNavigate();
  useEffect(() => {
    const fetchAuthCode = async () => {
      const authCode = encodeURIComponent(
        new URLSearchParams(window.location.search).get('code')!,
      );

      console.log(authCode);

      if (!authCode) {
        console.log('Authorization code가 없습니다.');
        return;
      }

      try {
        const res = await googlelogin(authCode);

        const status = res.data;
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

export default GoogleLoginLoading;
