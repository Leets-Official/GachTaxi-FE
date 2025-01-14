import { morningOrAfternoon, hours, mins } from '@/constants';
import { motion, useMotionValue } from 'framer-motion';

interface TimeSelectProps {
  timeVal: string;
  onChange: (value: string) => void;
}

const TimeSelect = ({ timeVal, onChange }: TimeSelectProps) => {
  // Motion values for each scrollable list
  const yPeriod = useMotionValue(0);
  const yHour = useMotionValue(0);
  const yMin = useMotionValue(0);

  // Helper function to calculate current index based on y position
  const calculateIndex = (y: number, itemHeight: number, length: number) =>
    Math.min(Math.max(Math.round(-y / itemHeight), 0), length - 1);

  // Function to handle dragging logic
  const handleDragEnd = (
    motionValue: typeof yPeriod,
    itemHeight: number,
    length: number,
    updateFn: (index: number) => void,
  ) => {
    const index = calculateIndex(motionValue.get(), itemHeight, length);
    motionValue.set(-index * itemHeight); // Snap to closest index
    updateFn(index); // Trigger onChange or logic
  };

  return (
    <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex justify-between overflow-hidden">
      <p className="font-medium text-captionHeader flex-shrink-0">출발 시간</p>

      <div className="flex w-full justify-center gap-[16px] h-full items-center">
        {/* Period (오전/오후) */}
        <div className="flex flex-col overflow-y-scroll scroll-hidden h-[25px] mr-2">
          {morningOrAfternoon.map((name) => (
            <motion.span
              drag="y"
              style={{ y: yPeriod }}
              dragConstraints={{
                top: -25 * (morningOrAfternoon.length - 1),
                bottom: 0,
              }}
              dragElastic={0.2}
              onDragEnd={() =>
                handleDragEnd(
                  yPeriod,
                  25,
                  morningOrAfternoon.length,
                  (index) => {
                    const [date, time] = timeVal.split(' '); // "2025-01-14"과 "01:00:00" 분리
                    let [hour] = time.split(':'); // 시간, 분, 초 분리

                    // 오전/오후에 따라 시간 조정
                    if (
                      morningOrAfternoon[index] === '오후' &&
                      parseInt(hour) < 12
                    ) {
                      hour = (parseInt(hour) + 12).toString(); // 오후일 경우 12를 더함
                    }

                    // 새로운 시간 문자열 생성
                    const newTime = `${hour}:00:00`;

                    // onChange에 새롭게 수정된 시간 값을 전달
                    onChange(`${date} ${newTime}`);
                  },
                )
              }
              key={name}
              className={`font-medium text-body py-[1px`}
            >
              {name}
            </motion.span>
          ))}
        </div>

        {/* Hours */}
        <div className="flex flex-col overflow-hidden h-[48px]">
          {hours.map((hour, index) => (
            <motion.p
              drag="y"
              style={{ y: yHour }}
              dragConstraints={{
                top: -48 * hours.length,
                bottom: 0,
              }}
              dragElastic={0.2}
              onDragEnd={() =>
                handleDragEnd(yHour, 62, hours.length, (index) => {
                  const updatedTime = `${hours[index]}:${timeVal.split(':')[1]}`;
                  onChange(updatedTime);
                })
              }
              key={hour}
              className={`font-semibold text-[48px] leading-none h-fit m-[2px]`}
            >
              {hour}
            </motion.p>
          ))}
        </div>

        <div>
          <span className="text-[42px] font-semibold relative bottom-[2px]">
            :
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col overflow-hidden h-[48px]">
          {mins.map((min, index) => (
            <motion.p
              drag="y"
              style={{ y: yMin }}
              dragConstraints={{
                top: -48 * mins.length,
                bottom: 0,
              }}
              dragElastic={0.2}
              onDragEnd={() =>
                handleDragEnd(yMin, 62, mins.length, (index) => {
                  const updatedTime = `${timeVal.split(':')[0]}:${mins[index]}`;
                  onChange(updatedTime);
                })
              }
              key={min}
              className={`font-semibold text-[48px] leading-none h-fit m-[2px]`}
            >
              {min}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSelect;
