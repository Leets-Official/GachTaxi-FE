import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      const scrollLeft = sliderRef.current.scrollLeft || 0;
      const slideWidth = sliderRef.current.clientWidth || 1;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * (sliderRef.current.clientWidth || 1),
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden">
      <motion.div
        ref={sliderRef}
        className="flex w-full h-full overflow-x-auto overflow-hidden snap-mandatory snap-x scroll-smooth scroll-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) {
            goToSlide(Math.min(currentIndex + 1, slides.length - 1));
          } else if (info.offset.x > 50) {
            goToSlide(Math.max(currentIndex - 1, 0));
          }
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-screen flex justify-center items-center snap-center"
          >
            {slide}
          </div>
        ))}
      </motion.div>

      {/* 페이지네이션 */}
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

      {/* 로그인 버튼 */}
      <div className="absolute w-[90%] bottom-5 flex flex-col max-w-[430px]">
        <KakaoLoginButton />
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default LandingPage;
