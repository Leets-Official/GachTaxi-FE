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
  useWatch,
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
import { useNavigate } from 'react-router-dom';

const ManualMatchingRegister = () => {
  const {
    auto: {
      destinationPoint: autoDestinationPoint,
      destinationName: autoDestinationName,
    },
    setAuto: { setStartPoint, setDestinationPoint, setDestinationName },
  } = useLocationStore();

  const manualMatchingForm = useForm<z.infer<typeof manualMatchingSchema>>({
    resolver: zodResolver(manualMatchingSchema),
    defaultValues: {
      startPoint: '',
      startName: '가천대 반도체대학',
      destinationPoint: autoDestinationPoint || '',
      destinationName: '가천대 AI 공학관',
      time: formatTimeToSelect(new Date(new Date().setHours(1, 0, 0, 0))),
      members: [],
      criteria: [],
      content: '',
      expectedTotalCharge: 4800,
    },
  });
  const { getCurrentLocation } = useGeoLocation();
  const { openToast } = useToast();
  const currentStartName = useWatch({
    control: manualMatchingForm.control,
    name: 'startName',
  });
  const currentDestinationName = useWatch({
    control: manualMatchingForm.control,
    name: 'destinationName',
  });
  const navigate = useNavigate();

  const updateDestinationCoordinates = useCallback(async () => {
    try {
      const results: any = await Promise.allSettled([
        getCoordinateByAddress(currentStartName),
        getCoordinateByAddress(currentDestinationName),
      ]);

      const [startResult, destinationResult] = results;

      if (startResult.status === 'fulfilled' && startResult.value) {
        const { lat, lng } = startResult.value;
        if (manualMatchingForm.getValues('startPoint') !== `${lng},${lat}`) {
          setStartPoint(`${lng},${lat}`);
        }
      }

      if (destinationResult.status === 'fulfilled' && destinationResult.value) {
        const { lat, lng } = destinationResult.value;
        if (
          manualMatchingForm.getValues('destinationPoint') !== `${lng},${lat}`
        ) {
          setDestinationPoint(`${lng},${lat}`);
          manualMatchingForm.setValue('destinationPoint', `${lng},${lat}`);
        }
      }
    } catch (error) {
      console.error('좌표 로드 중 오류 발생:', error);
    }
  }, [
    manualMatchingForm,
    currentStartName,
    currentDestinationName,
    setStartPoint,
    setDestinationPoint,
  ]);

  useEffect(() => {
    // 목적지 이름이 변경된 경우에만 동작
    if (currentDestinationName !== autoDestinationName && window.kakao?.maps) {
      window.kakao.maps.load(updateDestinationCoordinates);
      setDestinationName(currentDestinationName);
    }
  }, [
    currentDestinationName,
    autoDestinationName,
    setDestinationName,
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
      navigate('/home');
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
