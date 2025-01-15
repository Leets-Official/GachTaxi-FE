import { ITEM_HEIGHT, MINUTES } from '@/constants';
import { motion, MotionValue } from 'framer-motion';

interface MinuteSelectProps {
  yMin: MotionValue;
  handleDragEnd: (
    variant: 'SMALL' | 'BIG',
    motionValue: MotionValue,
    items: string[],
    updateFn: (index: number) => void,
  ) => void;
  timeVal: string;
  onChange: (value: string) => void;
}

const MinuteSelect = ({
  yMin,
  handleDragEnd,
  timeVal,
  onChange,
}: MinuteSelectProps) => {
  return (
    <div className="flex flex-col overflow-y-scroll scroll-hidden h-[48px] relative bottom-1">
      {MINUTES.map((min) => (
        <motion.div
          key={min}
          drag="y"
          style={{ y: yMin }}
          dragConstraints={{
            top: -ITEM_HEIGHT * (MINUTES.length - 1),
            bottom: 0,
          }}
          dragElastic={0.3}
          onDragEnd={() =>
            handleDragEnd('BIG', yMin, MINUTES, (index) => {
              const [date, time] = timeVal.split(' ');

              const updatedTime = `${time.split(':')[0]}:${MINUTES[index]}:00`;
              onChange(`${date} ${updatedTime}`);
            })
          }
          className="flex items-center justify-center h-[48px]"
        >
          <span className="font-semibold text-[48px] leading-none">{min}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default MinuteSelect;
