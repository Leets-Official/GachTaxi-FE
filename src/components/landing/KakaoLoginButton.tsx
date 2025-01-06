import Button from '../commons/Button';
import KakaoIcon from '@/assets/icon/kakao.svg?react';

const handleKakaoLogin = () => {
  const onClickKakao = () => {};

  return (
    <Button
      variant="primary"
      className="bg-yellow-300 text-black w-full flex justify-center"
      onClick={onClickKakao}
    >
      <KakaoIcon className="mr-2" />
      카카오로 시작하기
    </Button>
  );
};

export default handleKakaoLogin;
