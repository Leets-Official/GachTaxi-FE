import Button from '../commons/Button';
import KakaoIcon from '@/assets/icon/kakao.svg?react';

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {};

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
