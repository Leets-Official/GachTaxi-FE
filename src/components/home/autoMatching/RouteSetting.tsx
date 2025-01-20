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
      render={({
        field: { value: startName, onChange: onChangeStartName },
      }) => (
        <Controller
          control={control}
          name={'destinationName' as Path<T>}
          render={({
            field: {
              value: destinationName,
              onChange: onChangeDestinationName,
            },
          }) => (
            <Controller
              control={control}
              name={'startPoint' as Path<T>}
              render={({
                field: { value: startPoint, onChange: onChangeStartPoint },
              }) => (
                <Controller
                  control={control}
                  name={'destinationPoint' as Path<T>}
                  render={({
                    field: {
                      value: destinationPoint,
                      onChange: onChangeDestinationPoint,
                    },
                  }) => (
                    <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex items-center justify-between">
                      <RouteSettingIcon />
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <input
                          className="font-medium text-captionHeader bg-transparent outline-none"
                          value={startName}
                          onChange={(e) => onChangeStartName(e.target.value)}
                          readOnly
                        />
                        <div className="border border-matchLine w-full rounded-full"></div>
                        <input
                          className="font-medium text-captionHeader bg-transparent outline-none"
                          value={destinationName}
                          onChange={(e) =>
                            onChangeDestinationName(e.target.value)
                          }
                          readOnly
                        />
                      </div>
                      <Button
                        variant="icon"
                        onClick={() => {
                          // 이름 교체
                          const tempName = startName;
                          onChangeStartName(destinationName);
                          onChangeDestinationName(tempName);

                          // 좌표 교체
                          const tempPoint = startPoint;
                          onChangeStartPoint(destinationPoint);
                          onChangeDestinationPoint(tempPoint);
                        }}
                      >
                        <RouteChangeIcon />
                      </Button>
                    </div>
                  )}
                />
              )}
            />
          )}
        />
      )}
    />
  );
};

export default RouteSetting;
