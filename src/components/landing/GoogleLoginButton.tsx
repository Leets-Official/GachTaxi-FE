import Button from '../commons/Button';
import GoogleIcon from '@/assets/icon/google.svg?react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {};

  return (
    <Button
      variant="primary"
      className="bg-white text-black w-full flex justify-center mt-3"
      onClick={handleGoogleLogin}
    >
      <GoogleIcon className="mr-2 align-middle" />
      구글로 시작하기
    </Button>
  );
};

export default GoogleLoginButton;
