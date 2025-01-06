import Button from '@/components/commons/Button';
import Kakao from '@/assets/icon/kakao.svg';
import Google from '@/assets/icon/google.svg';
import Header from '@/components/landing/Header';
import onClickGoogle from '@/components/landing/ClickGoogle';
import onClickKakao from '@/components/landing/ClickKakao';
import GachiTaxi from '@/assets/icon/gachiTaxi.svg';

const FirstLanding = () => {
  return (
    <>
      <Header />
      <img src={GachiTaxi} alt="gachTaxi" className="float-right mb-[150px]" />
      <Button
        variant="primary"
        className="bg-[#FFE001] text-black w-full flex justify-center"
        onClick={onClickKakao}
      >
        <img src={Kakao} alt="kakao" className="mr-2" />
        카카오로 시작하기
      </Button>
      <Button
        variant="primary"
        className="bg-white text-black w-full flex justify-center mt-3"
        onClick={onClickGoogle}
      >
        <img src={Google} alt="google" className="mr-2 align-middle" />
        구글로 시작하기
      </Button>
    </>
  );
};

export default FirstLanding;
