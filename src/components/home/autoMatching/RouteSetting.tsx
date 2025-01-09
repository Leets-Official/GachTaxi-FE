import RouteSettingIcon from '@/assets/icon/routeSettingIcon.svg?react';
import RouteChangeIcon from '@/assets/icon/routeChangeIcon.svg?react';
import Button from '@/components/commons/Button';
import { memo } from 'react';

interface RouteSettingProps {
  matchingData: any;
  handleRouteChange: () => void;
}

const RouteSetting = ({
  matchingData,
  handleRouteChange,
}: RouteSettingProps) => {
  return (
    <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex items-center justify-between">
      <RouteSettingIcon />
      <div className="flex-1 flex flex-col justify-between h-full">
        <p className="font-medium text-captionHeader">
          {matchingData.start === 'main gate' ? '가천대 정문' : 'AI 공학관'}
        </p>
        <div className="border border-matchLine w-full rounded-full"></div>
        <p className="font-medium text-captionHeader">
          {matchingData.end === 'AI building' ? 'AI 공학관' : '가천대 정문'}
        </p>
      </div>
      <Button variant="icon" onClick={handleRouteChange}>
        <RouteChangeIcon />
      </Button>
    </div>
  );
};

export default memo(RouteSetting);
