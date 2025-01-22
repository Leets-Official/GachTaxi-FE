/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
} from 'react-hook-form';
import { ManualMatchingTypes } from 'gachTaxi-types';
import { manualMatchingSchema } from '@/libs/schemas/match';
import RouteSetting from '@/components/home/autoMatching/RouteSetting';
import InviteMembers from '@/components/home/autoMatching/inviteMembers';
import SelectTags from '@/components/home/autoMatching/selectTags';
import AddContent from '@/components/manual-register/AddContent';
import { formatTimeToSelect } from '@/utils';
import TimeSelect from '@/components/manual-register/timeSelect';
import useGeoLocation from '@/hooks/useGeoLocation';
import { useEffect, useCallback } from 'react';
import getCoordinateByAddress from '@/libs/apis/getCoordinateByAddress';
import { useToast } from '@/contexts/ToastContext';
import useLocationStore from '@/store/useLocationStore';

const ManualMatchingRegister = () => {
  const manualMatchingForm = useForm<z.infer<typeof manualMatchingSchema>>({
    resolver: zodResolver(manualMatchingSchema),
    defaultValues: {
      startPoint: '',
      startName: '가천대 정문',
      destinationPoint: '',
      destinationName: '가천대 AI 공학관',
      time: formatTimeToSelect(new Date(new Date().setHours(1, 0, 0, 0))),
      members: [],
      criteria: [],
      content: '',
      expectedTotalCharge: 4800,
    },
  });

  const {
    manual: { destinationName, destinationPoint },
    setManual: { setDestinationName, setDestinationPoint },
  } = useLocationStore();
  const { getCurrentLocation } = useGeoLocation();
  const { openToast } = useToast();

  // 목적지 좌표 설정 함수
  const updateDestinationCoordinates = useCallback(async () => {
    try {
      const address = manualMatchingForm.getValues('destinationName');
      const coordinates: any = await getCoordinateByAddress(address);
      manualMatchingForm.setValue(
        'destinationPoint',
        `${coordinates.lat},${coordinates.lng}`,
      );
    } catch (error) {
      console.error('목적지 좌표 로드 오류', error);
    }
  }, [manualMatchingForm]);

  const currentDestinationName = manualMatchingForm.watch('destinationName');
  const currentDestinationPoint = manualMatchingForm.watch('destinationPoint');

  // 목적지 정보 업데이트
  useEffect(() => {
    if (
      currentDestinationName !== destinationName ||
      (currentDestinationPoint !== destinationPoint && window.kakao?.maps)
    ) {
      setDestinationName(destinationName);
      setDestinationPoint(currentDestinationPoint);
      console.log('카카오 api 호출');
      // window.kakao.maps.load(updateDestinationCoordinates);
    }
  }, [
    currentDestinationName,
    currentDestinationPoint,
    destinationName,
    destinationPoint,
    setDestinationName,
    setDestinationPoint,
    updateDestinationCoordinates,
  ]);

  const onSubmit = async () => {
    try {
      const coordinates = await getCurrentLocation();
      if (!coordinates) {
        throw new Error('위치 정보를 가져오지 못했습니다.');
      }

      manualMatchingForm.setValue(
        'startPoint',
        `${coordinates.lat},${coordinates.lng}`,
        { shouldValidate: true },
      );

      manualMatchingForm.handleSubmit(
        handleSubmitToManualMatching,
        handleError,
      )();
    } catch (error) {
      console.error('위치 정보 로드 오류:', error);
    }
  };

  const handleSubmitToManualMatching: SubmitHandler<
    ManualMatchingTypes
  > = async (data) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleError = (errors: FieldValues) => {
    const message = Object.values(errors).find(
      (item) => item?.message,
    )?.message;
    openToast(message, 'error');
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal relative max-h-screen">
      <BackButton />
      <h1 className="text-header font-bold">수동 매칭 등록</h1>

      <form
        className="flex-1 overflow-scroll scroll-hidden mb-[62px] flex flex-col gap-[16px] rounded-box"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <RouteSetting control={manualMatchingForm.control} />
        <Controller
          name="time"
          control={manualMatchingForm.control}
          render={({ field }) => (
            <TimeSelect timeVal={field.value} onChange={field.onChange} />
          )}
        />
        <InviteMembers control={manualMatchingForm.control} />
        <SelectTags control={manualMatchingForm.control} />
        <AddContent control={manualMatchingForm.control} />
        <button type="submit" className="hidden"></button>
      </form>

      <div className="absolute left-0 bottom-0 w-full p-horizontal">
        <Button type="button" className="w-full" onClick={onSubmit}>
          매칭등록
        </Button>
      </div>
    </section>
  );
};

export default ManualMatchingRegister;
