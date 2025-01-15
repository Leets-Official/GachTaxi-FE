import { useMotionValue, MotionValue, animate } from 'framer-motion';
import { useState } from 'react';
import { ITEM_HEIGHT, SMALL_ITEM_HEIGHT } from '@/constants';
import PeriodSelect from '@/components/manual-register/timeSelect/PeriodSelect';
import HourSelect from '@/components/manual-register/timeSelect/HourSelect';
import MinuteSelect from '@/components/manual-register/timeSelect/MinuteSelect';

interface TimeSelectProps {
  timeVal: string;
  onChange: (value: string) => void;
}

const TimeSelect = ({ timeVal, onChange }: TimeSelectProps) => {
  const yPeriod = useMotionValue(0);
  const yHour = useMotionValue(0);
  const yMin = useMotionValue(0);
  const [period, setPeriod] = useState<'오전' | '오후'>('오전');

  const calculateIndex = (y: number, length: number) => {
    const rawIndex = Math.round(-y / ITEM_HEIGHT);
    return Math.min(Math.max(rawIndex, 0), length - 1);
  };

  const handleDragEnd = (
    variant: 'SMALL' | 'BIG',
    motionValue: MotionValue,
    items: string[],
    updateFn: (index: number) => void,
  ) => {
    const currentY = motionValue.get();
    const index = calculateIndex(currentY, items.length);
    const targetY =
      -index * (variant === 'SMALL' ? SMALL_ITEM_HEIGHT : ITEM_HEIGHT);

    animate(motionValue, targetY, {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      restDelta: 0.5,
    });

    updateFn(index);
  };

  return (
    <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex justify-between overflow-hidden">
      <p className="font-medium text-captionHeader flex-shrink-0">출발 시간</p>

      <div className="flex w-full justify-center gap-[16px] h-full items-center">
        {/* Period (오전/오후) */}
        <PeriodSelect
          yPeriod={yPeriod}
          handleDragEnd={handleDragEnd}
          timeVal={timeVal}
          onChange={onChange}
          setPeriod={setPeriod}
        />

        {/* Hours */}
        <HourSelect
          yHour={yHour}
          handleDragEnd={handleDragEnd}
          timeVal={timeVal}
          onChange={onChange}
          period={period}
        />

        <div>
          <span className="text-[42px] font-semibold relative bottom-[2px]">
            :
          </span>
        </div>

        {/* Minutes */}
        <MinuteSelect
          yMin={yMin}
          handleDragEnd={handleDragEnd}
          timeVal={timeVal}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TimeSelect;
