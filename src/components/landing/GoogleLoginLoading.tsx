import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/loading';
import googlelogin from '@/libs/apis/googleLogin.api';
import useUserStore from '@/store/useUserStore';

const GoogleLoginLoading = () => {
  const nav = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchAuthCode = async () => {
      const authCode = encodeURIComponent(
        new URLSearchParams(window.location.search).get('code')!,
      );

      if (!authCode) {
        console.log('Authorization code가 없습니다.');
        return;
      }

      try {
        const res = await googlelogin(authCode);
        const status = res.data.status;

        if (status === 'LOGIN_SUCCESS') {
          const memberResponseDto = res.data.memberResponseDto;
          setUser(memberResponseDto);
          nav('/home');
        } else if (status === 'UN_REGISTER') {
          nav('/signup/verification');
        }
      } catch (error) {
        console.log('post 실패: ', error);
      }
    };

    fetchAuthCode();
  }, [nav, setUser]);

  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default GoogleLoginLoading;
