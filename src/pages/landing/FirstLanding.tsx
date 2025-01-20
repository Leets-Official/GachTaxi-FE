import LandingHeader from '@/components/landing/LandingHeader';
import FirstSvg from '@/assets/icon/firstLandingPage.svg?react';

const FirstLanding = () => {
  return (
    <section className="w-full flex-1 flex flex-col items-center h-screen gap-8">
      <div className="text-center">
        <LandingHeader
          title="지금 바로 매칭하기"
          subtitle={`자동 매칭 기능을 통해\n현재 위치에서 매칭하기`}
        />
      </div>
      <FirstSvg />
    </section>
  );
};

export default FirstLanding;
