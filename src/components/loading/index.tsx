import { useEffect, useState } from 'react';
import LoadingTaxi from '@/assets/icon/loadingTaxi.svg?react';

const LoadingScreen = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 10) % 360);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkBlack text-white">
      <p className="text-header font-bold absolute top-[20%]">로딩 중...</p>
      <div className="relative flex items-center justify-center">
        <svg
          className="animate-spin"
          width="200"
          height="200"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#4F624A"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#08F283"
            strokeWidth="10"
            strokeDasharray="27.9 223.3"
            strokeDashoffset="188.4"
            strokeLinecap="butt"
            transform={`rotate(${rotation - 90} 50 50)`}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingTaxi />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
