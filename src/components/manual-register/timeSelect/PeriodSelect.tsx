import { DAY_PERIOD, GRADIENT_STYLE, SMALL_ITEM_HEIGHT } from '@/constants';
import { motion, MotionValue } from 'framer-motion';

interface PeriodSelectProps {
  yPeriod: MotionValue;
  handleDragEnd: (
    variant: 'SMALL' | 'BIG',
    motionValue: MotionValue,
    items: string[],
    updateFn: (index: number) => void,
  ) => void;
  timeVal: string;
  onChange: (value: string) => void;
  setPeriod: (value: '오전' | '오후') => void;
}

const PeriodSelect = ({
  yPeriod,
  handleDragEnd,
  timeVal,
  onChange,
  setPeriod,
}: PeriodSelectProps) => {
  // handleDragEnd 로직을 분리하여 PeriodSelect 내부에서 개별적으로 사용하는 함수
  const handlePeriodDragEnd = (
    index: number,
    setPeriod: (value: '오전' | '오후') => void,
    onChange: (value: string) => void,
  ) => {
    const [date, time] = timeVal.split(' ');
    let hour = time.split(':')[0];
    const minute = time.split(':')[1];

    if (DAY_PERIOD[index] === '오후') {
      hour = (parseInt(hour) + 12).toString().padStart(2, '0');
      setPeriod('오후');
    } else if (DAY_PERIOD[index] === '오전') {
      if (parseInt(hour) > 12) {
        hour = (parseInt(hour) - 12).toString().padStart(2, '0');
        setPeriod('오전');
      }
    }

    const newTime = `${hour}:${minute}:00`;
    onChange(`${date} ${newTime}`);
  };

  return (
    <div
      className="flex flex-col overflow-visible scroll-hidden h-[37px] mr-2 relative top-[5px]"
      style={GRADIENT_STYLE}
    >
      {DAY_PERIOD.map((name) => (
        <motion.div
          key={name}
          drag="y"
          style={{ y: yPeriod }}
          dragConstraints={{
            top: -SMALL_ITEM_HEIGHT * (DAY_PERIOD.length - 1),
            bottom: 0,
          }}
          dragElastic={0.3}
          onDragEnd={() =>
            handleDragEnd('SMALL', yPeriod, DAY_PERIOD, (index) =>
              handlePeriodDragEnd(index, setPeriod, onChange),
            )
          }
          className="flex items-center justify-center h-[25px]"
        >
          <span className="font-medium text-body py-[1px] flex items-center justify-center h-[25px] leading-none">
            {name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default PeriodSelect;
