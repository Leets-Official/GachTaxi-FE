import LandingHeader from '@/components/landing/LandingHeader';
import SecondSvg from '@/assets/icon/secondLanding.svg?react';

const SecondLanding = () => {
  return (
    <section className="w-full flex-1 flex flex-col items-center h-screen gap-8 z-10">
      <div className="text-center">
        <LandingHeader
          title="매칭 미리 예약하기"
          subtitle={`수동 매칭 기능을 통해\n매칭을 미리 예약하기`}
        />
      </div>
      <SecondSvg className="items-cemter mt-[10px]" />
    </section>
  );
};

export default SecondLanding;
