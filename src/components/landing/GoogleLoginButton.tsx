import Button from '../commons/Button';
import GoogleIcon from '@/assets/icon/google.svg?react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const link = `https://accounts.google.com/o/oauth2/v2/auth?
client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URI}
&response_type=code
&scope=email+profile`;

    window.location.href = link;
  };

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
