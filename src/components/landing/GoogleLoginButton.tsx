import { useGoogleLogin } from '@react-oauth/google';
import Button from '../commons/Button';
import GoogleIcon from '@/assets/icon/google.svg?react';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      if (credentialResponse) {
        // 백엔드 API 호출
        console.log(credentialResponse);
        navigate('/signup/verification');
        // if data!.status === "UN_REGISTER"
        // navigate('/signup/verification');
        // else
        // navigate('/dashboard'); path는 미정
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
