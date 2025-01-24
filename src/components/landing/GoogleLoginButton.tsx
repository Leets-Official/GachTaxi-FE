import { useGoogleLogin } from '@react-oauth/google';
import Button from '../commons/Button';
import GoogleIcon from '@/assets/icon/google.svg?react';
import { useNavigate } from 'react-router-dom';
import googlelogin from '@/libs/apis/googleLogin.api';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      if (credentialResponse) {
        const res = await googlelogin(credentialResponse.access_token);
        if (res.data === 'UN_REGISTER') {
          navigate('/signup/verification');
        } else if (res.data === 'LOGIN_SUCCESS') {
          navigate('/home');
        }
      }
    },
    onError: (error) => {
      throw new Error(`에러 발생 : ${error}`);
    },
  });

  return (
    <Button
      variant="primary"
      className="bg-white text-black w-full flex justify-center mt-3 items-center"
      onClick={() => handleGoogleLogin()}
    >
      <GoogleIcon className="mr-2 align-middle" />
      구글로 시작하기
    </Button>
  );
};

export default GoogleLoginButton;
