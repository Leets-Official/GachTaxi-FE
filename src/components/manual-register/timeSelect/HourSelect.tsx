import { HOURS, ITEM_HEIGHT } from '@/constants';
import { motion, MotionValue } from 'framer-motion';

interface HourSelectProps {
  yHour: MotionValue;
  handleDragEnd: (
    variant: 'SMALL' | 'BIG',
    motionValue: MotionValue,
    items: string[],
    updateFn: (index: number) => void,
  ) => void;
  timeVal: string;
  onChange: (value: string) => void;
  period: string;
}

const HourSelect = ({
  yHour,
  handleDragEnd,
  timeVal,
  onChange,
  period,
}: HourSelectProps) => {
  // handleDragEnd 로직을 분리하여 HourSelect 내부에서 개별적으로 사용하는 함수
  const handleHourDragEnd = (
    index: number,
    period: string,
    onChange: (value: string) => void,
  ) => {
    const [date] = timeVal.split(' ');
    let hour;
    if (period === '오전') {
      hour = HOURS[index];
    } else {
      hour = parseInt(HOURS[index]) + 12;
    }

    const updatedTime = `${hour}:${timeVal.split(':')[1]}:00`;
    onChange(`${date} ${updatedTime}`);
  };

  return (
    <div className="flex flex-col overflow-y-scroll scroll-hidden h-[48px] relative bottom-1">
      {HOURS.map((hour) => (
        <motion.div
          key={hour}
          drag="y"
          style={{ y: yHour }}
          dragConstraints={{
            top: -ITEM_HEIGHT * (HOURS.length - 1),
            bottom: 0,
          }}
          dragElastic={0.3}
          onDragEnd={() =>
            handleDragEnd('BIG', yHour, HOURS, (index) => {
              handleHourDragEnd(index, period, onChange);
            })
          }
          className="flex items-center justify-center h-[48px]"
        >
          <span className="font-semibold text-[48px] leading-none">{hour}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default HourSelect;
