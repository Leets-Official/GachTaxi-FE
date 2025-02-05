import TaxiSvg from '@/assets/icon/gachonTaxi.svg?react';
import { motion } from 'framer-motion';

const TaxiLoading = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-darkBlack text-white">
      <div className="relative flex flex-1 items-center justify-center z-10 mb-1">
        <TaxiSvg />
      </div>

      <div className="absolute top-[56%] w-48 h-3 bg-textDarkGray rounded-full overflow-hidden z-0">
        <motion.div
          className="h-full bg-primary w-1/2 rounded-full"
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
        />
      </div>
    </section>
  );
};

export default TaxiLoading;
