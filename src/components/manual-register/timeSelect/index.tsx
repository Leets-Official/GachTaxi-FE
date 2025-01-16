import { useMotionValue } from 'framer-motion';
import { useState } from 'react';
import PeriodSelect from '@/components/manual-register/timeSelect/PeriodSelect';
import HourSelect from '@/components/manual-register/timeSelect/HourSelect';
import MinuteSelect from '@/components/manual-register/timeSelect/MinuteSelect';
import { handleDragEnd } from '@/utils';

interface TimeSelectProps {
  timeVal: string;
  onChange: (value: string) => void;
}

const TimeSelect = ({ timeVal, onChange }: TimeSelectProps) => {
  const yPeriod = useMotionValue(0);
  const yHour = useMotionValue(0);
  const yMin = useMotionValue(0);
  const [period, setPeriod] = useState<'오전' | '오후'>('오전');

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
