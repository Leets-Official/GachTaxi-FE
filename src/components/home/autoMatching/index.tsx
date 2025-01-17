import MiniTaxiLogoIcon from '@/assets/icon/miniTaxiLogoIcon.svg?react';
import Button from '@/components/commons/Button';
import RouteSetting from '@/components/home/autoMatching/RouteSetting';
import SelectTags from '@/components/home/autoMatching/selectTags';
import { AutoMatchingTypes } from 'gachTaxi-types';
import z from 'zod';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { autoMatchingSchema } from '@/libs/schemas/match';
import InviteMembers from '@/components/home/autoMatching/inviteMembers';
import useGeoLocation from '@/hooks/useGeoLocation';
import getCoordinateByAddress from '@/libs/apis/getCoordinateByAddress';
import { useCallback, useEffect } from 'react';

const AutoMatching = ({ isOpen }: { isOpen: boolean }) => {
  const autoMatchingForm = useForm<z.infer<typeof autoMatchingSchema>>({
    resolver: zodResolver(autoMatchingSchema),
    defaultValues: {
      startPoint: '',
      startName: '가천대 정문',
      destinationPoint: '',
      destinationName: '가천대 AI 공학관',
      members: [],
      criteria: [],
      expectedTotalCharge: 4800,
    },
    mode: 'onBlur',
  });

  const location = useGeoLocation();

  // 목적지 좌표 설정 함수
  const updateDestinationCoordinates = useCallback(async () => {
    try {
      const address = autoMatchingForm.getValues('destinationName');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const coordinates: any = await getCoordinateByAddress(address);
      autoMatchingForm.setValue(
        'destinationPoint',
        `${coordinates.lat},${coordinates.lng}`,
      );
    } catch (error) {
      console.error('목적지 좌표 로드 오류', error);
    }
  }, [autoMatchingForm]);

  // 위치 정보 업데이트
  useEffect(() => {
    if (
      location.loaded &&
      location.coordinates.lat &&
      location.coordinates.lng
    ) {
      autoMatchingForm.setValue(
        'startPoint',
        `${location.coordinates.lat},${location.coordinates.lng}`,
      );
    }
  }, [location, autoMatchingForm]);

  // 목적지 정보 업데이트
  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(updateDestinationCoordinates);
    } else {
      console.error('카카오맵 api 동작 오류');
    }
  }, [updateDestinationCoordinates]);

  const handleSubmitToAutoMatching: SubmitHandler<AutoMatchingTypes> = (
    data,
  ) => {
    // API 호출
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleError = (errors: FieldValues) => {
    console.error(errors);
  };

  return (
    <div
      className={`flex flex-col ${isOpen ? 'gap-[32px] h-fit' : 'h-[260px]'} justify-between`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-header font-bold">바로 매칭</h2>
        <MiniTaxiLogoIcon />
      </div>

      <form
        className="flex flex-col gap-[16px] h-fit max-h-[calc(100dvh-310px)] overflow-y-scroll scroll-hidden"
        onSubmit={autoMatchingForm.handleSubmit(
          handleSubmitToAutoMatching,
          handleError,
        )}
      >
        <RouteSetting control={autoMatchingForm.control} />
        {isOpen && (
          <>
            <InviteMembers control={autoMatchingForm.control} />
            <SelectTags control={autoMatchingForm.control} />
          </>
        )}

        <div className="w-full">
          <Button variant="primary" className="w-full mt-[16px]" type="submit">
            매칭 시작
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AutoMatching;
