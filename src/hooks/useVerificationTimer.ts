import { useState, useRef, useEffect } from 'react';

const TIMER_INTERVAL = 1000;

const useVerificationTimer = (timerDuration: number) => {
  const [timer, setTimer] = useState(timerDuration); // 5분 타이머
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 타이머 시작 또는 초기화
  const startTimer = () => {
    setTimer(300); // 5분으로 초기화
    clearInterval(timerRef.current!); // 기존 타이머 초기화
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!); // 타이머 종료 시 정리
          return 0;
        }
        return prev - 1;
      });
    }, TIMER_INTERVAL);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { timer, startTimer };
};

export default useVerificationTimer;
