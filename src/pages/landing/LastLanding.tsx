import LandingHeader from '@/components/landing/LandingHeader';
import LastSvg from '@/assets/icon/lastLanding.svg?react';

const LastLanding = () => {
  return (
    <section className="w-full flex-1 flex flex-col items-center h-screen gap-8 z-10">
      <div className="text-center">
        <LandingHeader
          title="키워드로 매칭하기"
          subtitle={`키워드 기능을 통해\n매칭 상대 고르기`}
        />
      </div>
      <LastSvg />
    </section>
  );
};

export default LastLanding;
