/* eslint-disable @typescript-eslint/no-explicit-any */
import MiniTaxiLogoIcon from '@/assets/icon/miniTaxiLogoIcon.svg?react';
import Button from '@/components/commons/Button';
import RouteSetting from '@/components/home/autoMatching/RouteSetting';
import SelectTags from '@/components/home/autoMatching/selectTags';
import { AutoMatchingTypes } from 'gachTaxi-types';
import z from 'zod';
import { useForm, SubmitHandler, FieldValues, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { autoMatchingSchema } from '@/libs/schemas/match';
import InviteMembers from '@/components/home/autoMatching/inviteMembers';
import useGeoLocation from '@/hooks/useGeoLocation';
import getCoordinateByAddress from '@/libs/apis/getCoordinateByAddress';
import { Suspense, useCallback, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import useLocationStore from '@/store/useLocationStore';
import startAutoMatching from '@/libs/apis/matching/startAutoMatching.api';
import useSSEStore from '@/store/useSSEStore';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AutoMatching = ({ isOpen }: { isOpen: boolean }) => {
  const {
    auto: {
      destinationPoint: autoDestinationPoint,
      destinationName: autoDestinationName,
    },
    setAuto: { setStartPoint, setDestinationPoint, setDestinationName },
  } = useLocationStore();
  const autoMatchingForm = useForm<z.infer<typeof autoMatchingSchema>>({
    resolver: zodResolver(autoMatchingSchema),
    defaultValues: {
      startPoint: '',
      startName: '가천대 반도체대학',
      destinationPoint:
        autoDestinationPoint || '127.134247729944,37.45524157529484',
      destinationName: '가천대 AI 공학관',
      members: [],
      criteria: [],
      expectedTotalCharge: 4800,
    },
    mode: 'onBlur',
  });

  const { initializeSSE } = useSSEStore();
  const { getCurrentLocation } = useGeoLocation();
  const { openToast } = useToast();
  const currentStartName = useWatch({
    control: autoMatchingForm.control,
    name: 'startName',
  });
  const currentDestinationName = useWatch({
    control: autoMatchingForm.control,
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
        if (autoMatchingForm.getValues('startPoint') !== `${lng},${lat}`) {
          setStartPoint(`${lng},${lat}`);
        }
      }

      if (destinationResult.status === 'fulfilled' && destinationResult.value) {
        const { lat, lng } = destinationResult.value;
        if (
          autoMatchingForm.getValues('destinationPoint') !== `${lng},${lat}`
        ) {
          setDestinationPoint(`${lng},${lat}`);
          autoMatchingForm.setValue('destinationPoint', `${lng},${lat}`);
        }
      }
    } catch (error) {
      console.error('좌표 로드 중 오류 발생:', error);
    }
  }, [
    autoMatchingForm,
    currentStartName,
    currentDestinationName,
    setStartPoint,
    setDestinationPoint,
  ]);

  useEffect(() => {
    initializeSSE();
  }, [initializeSSE]);

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

      autoMatchingForm.setValue(
        'startPoint',
        `${coordinates.lng},${coordinates.lat}`,
        { shouldValidate: true },
      );

      autoMatchingForm.handleSubmit(handleSubmitToAutoMatching, handleError)();
    } catch (error) {
      console.error('위치 정보 로드 오류:', error);
    }
  };

  const handleSubmitToAutoMatching: SubmitHandler<AutoMatchingTypes> = async (
    data,
  ) => {
    try {
      const res = await startAutoMatching(data);
      if (res?.code && res.code >= 200 && res.code < 300) {
        openToast(res.message, 'success');
        navigate('/matching');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        const errorCode = error.response?.status;

        openToast(errorMessage, 'error');
        if (errorCode === 409) {
          openToast('이미 매칭에 참가한 멤버에요!', 'error');
          navigate('/matching');
        }
      }
    }
  };

  const handleError = (error: FieldValues) => {
    const message = Object.values(error).find((item) => item?.message)?.message;
    openToast(message, 'error');
  };

  return (
    <div
      className={`flex flex-col ${isOpen ? 'gap-[32px] h-fit' : 'h-[260px]'} justify-between w-full`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-header font-bold">바로 매칭</h2>
        <MiniTaxiLogoIcon />
      </div>

      <form
        className="flex flex-col gap-[16px] h-fit max-h-[calc(100dvh-310px)] overflow-y-scroll scroll-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <RouteSetting control={autoMatchingForm.control} />
        {isOpen && (
          <>
            <Suspense
              fallback={
                <div className="h-[150px] w-full flex items-center justify-center">
                  <SpinnerIcon
                    width={36}
                    height={36}
                    className="mx-auto spinner"
                  />
                </div>
              }
            >
              <InviteMembers control={autoMatchingForm.control} />
            </Suspense>
            <SelectTags control={autoMatchingForm.control} />
          </>
        )}

        {isOpen || (
          <p className="font-medium text-[10px] text-textDarkGray">
            추가 설정을 통해 상세한 매칭을 할 수 있어요
          </p>
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
