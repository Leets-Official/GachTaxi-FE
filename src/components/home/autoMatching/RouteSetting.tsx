import { Control, Controller } from 'react-hook-form';
import Button from '@/components/commons/Button';
import RouteSettingIcon from '@/assets/icon/routeSettingIcon.svg?react';
import RouteChangeIcon from '@/assets/icon/routeChangeIcon.svg?react';
import { Path } from 'react-hook-form';
import { MatchingSchema } from 'gachTaxi-types';

interface RouteSettingProps<T extends MatchingSchema> {
  control: Control<T>;
}

const RouteSetting = <T extends MatchingSchema>({
  control,
}: RouteSettingProps<T>) => {
  return (
    <Controller
      control={control}
      name={'route' as Path<T>}
      render={({ field: { value, onChange } }) => (
        <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex items-center justify-between">
          <RouteSettingIcon />
          <div className="flex-1 flex flex-col justify-between h-full">
            <p className="font-medium text-captionHeader">
              {value === 'BASIC' ? '가천대 정문' : 'AI 공학관'}
            </p>
            <div className="border border-matchLine w-full rounded-full"></div>
            <p className="font-medium text-captionHeader">
              {value === 'BASIC' ? 'AI 공학관' : '가천대 정문'}
            </p>
          </div>
          <Button
            variant="icon"
            onClick={() => onChange(value === 'BASIC' ? 'REVERSE' : 'BASIC')}
          >
            <RouteChangeIcon />
          </Button>
        </div>
      )}
    />
  );
};

export default RouteSetting;
