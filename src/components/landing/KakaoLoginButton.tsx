import Button from '../commons/Button';
import KakaoIcon from '@/assets/icon/kakao.svg?react';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.REST_API_KEY;
  const REDIRECT_URI = import.meta.env.REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  return (
    <Button
      variant="primary"
      className="bg-yellow-300 text-black w-full flex justify-center"
      onClick={handleKakaoLogin}
    >
      <KakaoIcon className="mr-2" />
      카카오로 시작하기
    </Button>
  );
};

export default KakaoLoginButton;
