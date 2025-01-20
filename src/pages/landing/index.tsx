import { useState, useRef, useEffect } from 'react';
import FirstLanding from './FirstLanding';
import SecondLanding from './SecondLanding';
import LastLanding from './LastLanding';
import KakaoLoginButton from '@/components/landing/KakaoLoginButton';
import GoogleLoginButton from '@/components/landing/GoogleLoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';

const slides = [<FirstLanding />, <SecondLanding />, <LastLanding />];

const LandingPage = () => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const slideWidth = sliderRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * sliderRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // 스크롤 방지 적용
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 원래 상태로 복구
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-around overflow-hidden">
      <div
        ref={sliderRef}
        className="mt-[10%] flex w-full h-full overflow-x-auto overflow-y-hidden scroll-hidden snap-mandatory snap-x scroll-smooth"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full flex justify-center items-center snap-center"
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="absolute bottom-[25%] flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex ? 'bg-primary' : 'bg-textDarkGray'
            }`}
          ></div>
        ))}
      </div>

      <div className="absolute w-[90%] bottom-0 mb-5 flex flex-col gap-1 w-full max-w-[430px]">
        <KakaoLoginButton />
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default LandingPage;
