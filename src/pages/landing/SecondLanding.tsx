import LandingHeader from '@/components/landing/LandingHeader';
import SecondPng from '@/assets/icon/secondLandingPage.png';
import { LANDING_TEXTS } from '@/constants';

const SecondLanding = () => {
  return (
    <section className="w-full flex-1 flex flex-col items-center h-screen gap-8">
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
      <img src={SecondPng} alt="Second Page" draggable="false" />
    </section>
  );
};

export default SecondLanding;
