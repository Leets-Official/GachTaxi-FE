import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import FirstLanding from './FirstLanding';
import SecondLanding from './SecondLanding';
import LastLanding from './LastLanding';
import KakaoLoginButton from '@/components/landing/KakaoLoginButton';
import GoogleLoginButton from '@/components/landing/GoogleLoginButton';

const slides = [<FirstLanding />, <SecondLanding />, <LastLanding />];

const LandingPage = () => {
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

  return (
    <div className="relative w-full flex flex-col items-center justify-around overflow-x-hidden">
      <motion.div
        ref={sliderRef}
        className="flex w-full overflow-x-auto overflow-y-hidden snap-mandatory snap-x scroll-smooth scroll-hidden"
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
            className="min-w-full flex justify-center items-center snap-center"
          >
            {slide}
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-[27%] flex justify-center gap-2 z-30">
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

      <div className="absolute w-[85%] bottom-10 flex flex-col max-w-[430px]">
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LandingPage;
