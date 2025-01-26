import Button from '../commons/Button';
import KakaoIcon from '@/assets/icon/kakao.svg?react';

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  };

  return (
    <Button
      variant="primary"
      className="bg-yellow-300 text-black w-full flex justify-center items-center"
      onClick={() => handleKakaoLogin()}
    >
      <KakaoIcon className="mr-2" />
      카카오로 시작하기
    </Button>
  );
};

export default KakaoLoginButton;
