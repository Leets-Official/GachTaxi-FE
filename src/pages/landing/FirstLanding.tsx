import LandingHeader from '@/components/landing/LandingHeader';
import KakaoLoginButton from '@/components/landing/KakaoLoginButton';
import GachiTaxi from '@/assets/icon/gachiTaxi.svg?react';
import GoogleLoginButton from '@/components/landing/GoogleLoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';

const FirstLanding = () => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <>
      <LandingHeader />
      <GachiTaxi className="float-right mb-[70px]" />
      <KakaoLoginButton />
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLoginButton />
      </GoogleOAuthProvider>
    </>
  );
};

export default FirstLanding;
