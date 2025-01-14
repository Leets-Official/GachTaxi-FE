import { DAY_PERIOD, HOURS, MINUTES } from '@/constants';
import { motion, useMotionValue, MotionValue, animate } from 'framer-motion';
import { useState } from 'react';

interface TimeSelectProps {
  timeVal: string;
  onChange: (value: string) => void;
}

const topStyle = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
  maskComposite: 'intersect', // 추가
  WebkitMaskComposite: 'destination-in', // Safari 호환
};

const TimeSelect = ({ timeVal, onChange }: TimeSelectProps) => {
  const yPeriod = useMotionValue(0);
  const yHour = useMotionValue(0);
  const yMin = useMotionValue(0);
  const [period, setPeriod] = useState<'오전' | '오후'>('오전');

  const ITEM_HEIGHT = 48;
  const SMALL_ITEM_HEIGHT = 25;

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
        <div
          className="flex flex-col overflow-visible scroll-hidden h-[37px] mr-2 relative top-[5px]"
          style={topStyle}
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
                handleDragEnd('SMALL', yPeriod, DAY_PERIOD, (index) => {
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
                })
              }
              className="flex items-center justify-center h-[25px]"
            >
              <span className="font-medium text-body py-[1px] flex items-center justify-center h-[25px] leading-none">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Hours */}
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
                  const [date] = timeVal.split(' ');
                  let hour;
                  if (period === '오전') {
                    hour = HOURS[index];
                  } else {
                    hour = parseInt(HOURS[index]) + 12;
                  }

                  const updatedTime = `${hour}:${timeVal.split(':')[1]}:00`;
                  onChange(`${date} ${updatedTime}`);
                })
              }
              className="flex items-center justify-center h-[48px]"
            >
              <span className="font-semibold text-[48px] leading-none">
                {hour}
              </span>
            </motion.div>
          ))}
        </div>

        <div>
          <span className="text-[42px] font-semibold relative bottom-[2px]">
            :
          </span>
        </div>

        {/* Minutes */}
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
              <span className="font-semibold text-[48px] leading-none">
                {min}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSelect;
