import LandingHeader from '@/components/landing/LandingHeader';
import KakaoLoginButton from '@/components/landing/KakaoLoginButton';
import GachiTaxi from '@/assets/icon/gachiTaxi.svg?react';
import GoogleLoginButton from '@/components/landing/GoogleLoginButton';

const FirstLanding = () => {
  return (
    <>
      <LandingHeader />
      <GachiTaxi className="float-right mb-[70px]" />
      <KakaoLoginButton />
      <GoogleLoginButton />
    </>
  );
};

export default FirstLanding;
