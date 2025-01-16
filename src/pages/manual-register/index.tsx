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

  const location = useGeoLocation();

  // 목적지 좌표 설정 함수
  const updateDestinationCoordinates = useCallback(async () => {
    try {
      const address = manualMatchingForm.getValues('destinationName');
      const coordinates: any = await getCoordinateByAddress(address);
      manualMatchingForm.setValue(
        'destinationPoint',
        `${coordinates.lat}, ${coordinates.lng}`,
      );
    } catch (error) {
      console.error('목적지 좌표 로드 오류', error);
    }
  }, [manualMatchingForm]);

  // 위치 정보 업데이트
  useEffect(() => {
    if (
      location.loaded &&
      location.coordinates.lat &&
      location.coordinates.lng
    ) {
      manualMatchingForm.setValue(
        'startPoint',
        `${location.coordinates.lat}, ${location.coordinates.lng}`,
      );
    }
  }, [location, manualMatchingForm]);

  // 목적지 정보 업데이트
  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(updateDestinationCoordinates);
    } else {
      console.error('카카오맵 api 동작 오류');
    }
  }, [updateDestinationCoordinates]);

  const handleSubmitToManualMatching: SubmitHandler<ManualMatchingTypes> = (
    data,
  ) => {
    try {
      console.log('Submitted Data:', data);
    } catch (e) {
      console.error('Submission Error:', e);
    }
  };

  const handleError = (errors: FieldValues) => {
    console.error(errors);
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal relative max-h-screen">
      <BackButton />
      <h1 className="text-header font-bold">수동 매칭 등록</h1>

      <form
        className="flex-1 overflow-scroll scroll-hidden mb-[62px] flex flex-col gap-[16px] rounded-box"
        onSubmit={manualMatchingForm.handleSubmit(handleSubmitToManualMatching)}
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
        <Button
          type="button"
          className="w-full"
          onClick={manualMatchingForm.handleSubmit(
            handleSubmitToManualMatching,
            handleError,
          )}
        >
          매칭등록
        </Button>
      </div>
    </section>
  );
};

export default ManualMatchingRegister;
