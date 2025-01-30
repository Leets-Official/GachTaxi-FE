import LandingHeader from '@/components/landing/LandingHeader';
import LastPng from '@/assets/icon/lastLandingPage.png';
import { LANDING_TEXTS } from '@/constants';

const LastLanding = () => {
  return (
    <section className="w-full flex-1 flex flex-col items-center h-screen gap-8">
      <div className="text-center">
        <LandingHeader
          title={LANDING_TEXTS.LAST_TITLE}
          subtitle={
            <>
              {LANDING_TEXTS.LAST_SUBTITLE.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </>
          }
        />
      </div>
      <img src={LastPng} alt="Last Page" draggable="false" />
    </section>
  );
};

export default LastLanding;
