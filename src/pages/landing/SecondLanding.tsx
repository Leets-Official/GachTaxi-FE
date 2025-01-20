import LandingHeader from '@/components/landing/LandingHeader';
import SecondSvg from '@/assets/icon/secondLanding.svg?react';
import { LANDING_TEXTS } from '@/constants';

const SecondLanding = () => {
  return (
    <section className="w-full flex-1 flex flex-col items-center h-screen gap-8 z-10">
      <div className="text-center">
        <LandingHeader
          title={LANDING_TEXTS.SECOND_TITLE}
          subtitle={
            <>
              {LANDING_TEXTS.SECOND_SUBTITLE.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </>
          }
        />
      </div>
      <SecondSvg className="items-cemter mt-[10px]" />
    </section>
  );
};

export default SecondLanding;
