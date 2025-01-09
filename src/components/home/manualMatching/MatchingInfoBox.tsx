import RouteSettingIcon from '@/assets/icon/smallRouteChangeIcon.svg?react';

const MatchingInfoBox = ({ manualInfo }: { manualInfo: any }) => {
  return (
    <div className="min-h-[144px] flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col gap-3">
      <div className="flex w-full justify-between items-center">
        <span className="text-captionHeader font-bold">{manualInfo.time}</span>
        <span className="text-body font-medium relative top-[-8px]">
          {manualInfo.memberCount}/4
        </span>
      </div>

      <div className="flex items-center gap-3">
        <RouteSettingIcon />
        <div className="relative top-[-2px]">
          <p className="font-medium text-captionHeader">
            {manualInfo.route === 'basic' ? '가천대 정문' : 'AI 공학관'}
          </p>
          <p className="font-medium text-captionHeader">
            {manualInfo.route === 'basic' ? 'AI 공학관' : '가천대 정문'}
          </p>
        </div>
      </div>

      <div className="flex overflow-x-scroll scroll-hidden gap-2">
        {manualInfo.tags.map((tag: any) => {
          return (
            <span
              key={tag}
              className="text-assistive min-w-fit text-black font-medium px-3 py-1 rounded-full bg-primary"
            >
              # {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MatchingInfoBox;
