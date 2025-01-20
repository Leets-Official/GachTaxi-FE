import LandingHeader from '@/components/landing/LandingHeader';
import FirstSvg from '@/assets/icon/firstLandingPage.svg?react';
import { LANDING_TEXTS } from '@/constants';

const FirstLanding = () => {
  return (
    <section className="w-full flex-1 flex flex-col items-center h-screen gap-8">
      <div className="text-center">
        <LandingHeader
          title={LANDING_TEXTS.FIRST_TITLE}
          subtitle={
            <>
              {LANDING_TEXTS.FIRST_SUBTITLE.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </>
          }
        />
      </div>
      <FirstSvg />
    </section>
  );
};

export default FirstLanding;
