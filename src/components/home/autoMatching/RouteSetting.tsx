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
      name={'startName' as Path<T>}
      render={({ field: { value, onChange: onChangeStartName } }) => {
        const startName = typeof value === 'string' ? value : '';

        return (
          <Controller
            control={control}
            name={'destinationName' as Path<T>}
            render={({
              field: { value, onChange: onChangeDestinationName },
            }) => {
              const destinationName = typeof value === 'string' ? value : '';

              return (
                <div className="h-[101px] w-full flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <RouteSettingIcon />
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-full w-full">
                    <input
                      className="font-medium text-captionHeader bg-transparent outline-none w-full"
                      value={startName}
                      onChange={(e) => onChangeStartName(e.target.value)}
                      readOnly
                    />
                    <div className="border border-matchLine w-full rounded-full"></div>
                    <input
                      className="font-medium text-captionHeader bg-transparent outline-none w-full"
                      value={destinationName}
                      onChange={(e) => onChangeDestinationName(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      variant="icon"
                      onClick={() => {
                        onChangeStartName(destinationName);
                        onChangeDestinationName(startName);
                      }}
                    >
                      <RouteChangeIcon />
                    </Button>
                  </div>
                </div>
              );
            }}
          />
        );
      }}
    />
  );
};

export default RouteSetting;
