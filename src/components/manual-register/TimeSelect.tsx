import { formatTimeToSelect } from '@/utils';

const TimeSelect = () => {
  const currentTime = formatTimeToSelect(
    new Date().toLocaleTimeString('en-GB'),
  );

  return (
    <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex justify-between">
      <p className="font-medium text-captionHeader flex-shrink-0">출발 시간</p>
      <div className="flex w-full justify-center gap-[16px] h-full items-center">
        <div className="flex flex-col overflow-scroll scroll-hidden h-[25px]">
          <span>오전</span>
          <span>오후</span>
        </div>
        <p className="font-semibold text-[48px] relative bottom-1">
          {currentTime.hour} : {currentTime.min}
        </p>
      </div>
    </div>
  );
};

export default TimeSelect;
