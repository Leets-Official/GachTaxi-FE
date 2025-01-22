/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useCallback, useEffect, useState } from 'react';
import { EventSourcePolyfill } from '@/utils/EventSourcePolyfill';
import axios from 'axios';
import { useToast } from '@/contexts/ToastContext';
import useLocationStore from '@/store/useLocationStore';

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

  const {
    autoDestinationPoint,
    setAutoStartPoint,
    setAutoDestinationPoint,
    autoDestinationName,
    setAutoDestinationName,
  } = useLocationStore();
  const { getCurrentLocation } = useGeoLocation();
  const { openToast } = useToast();
  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(
    null,
  );
  const destinationName = autoMatchingForm.watch('destinationName');
  const currentDestinationPoint = autoMatchingForm.watch('destinationPoint');
  const currentStartPoint = autoMatchingForm.watch('startPoint');

  // 컴포넌트 언마운트시 구독 종료
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    };
  }, [eventSource]);

  const updateDestinationCoordinates = useCallback(async () => {
    try {
      const [startCoordinate, destinationCoordinate]: any = await Promise.all([
        getCoordinateByAddress(currentDestinationPoint),
        getCoordinateByAddress(currentStartPoint),
      ]);

      setAutoStartPoint(`${startCoordinate.lat},${startCoordinate.lng}`);
      setAutoDestinationPoint(
        `${destinationCoordinate.lat},${destinationCoordinate.lng}`,
      );
      autoMatchingForm.setValue(
        'destinationPoint',
        `${destinationCoordinate.lat},${destinationCoordinate.lng}`,
      );
    } catch (error) {
      console.error('목적지 좌표 로드 오류', error);
    }
  }, [autoMatchingForm, setAutoDestinationPoint]);

  useEffect(() => {
    if (
      destinationName !== autoDestinationName ||
      (currentDestinationPoint !== autoDestinationPoint && window.kakao?.maps)
    ) {
      setAutoDestinationName(destinationName);
      setAutoDestinationPoint(currentDestinationPoint);
      console.log('카카오 api 호출');
      // window.kakao.maps.load(updateDestinationCoordinates);
    }
  }, [
    destinationName,
    currentDestinationPoint,
    autoDestinationName,
    autoDestinationPoint,
    setAutoDestinationName,
    setAutoDestinationPoint,
    updateDestinationCoordinates,
  ]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // SSE 구독
  const subscribeToSSE = useCallback(() => {
    const sse = new EventSourcePolyfill(
      `${baseUrl}/api/matching/auto/subscribe`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGEuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo2MDAwMDAwMDAwMH0.40DhQGzszXAawIW6XMJ08uAaYhulOF0x-9FYk0wr8SI`,
        },
        withCredentials: true,
      },
    );

    sse.onmessage = (event: MessageEvent) => {
      const lines = event.data.split('\n');
      const parsedEvent: { event?: string; data?: any } = {};

      // SSE 메시지 파싱
      /**
       * {
       *  event: "init",
       *  data: {
       *    message: "member 1 Connection established"
       *  }
       * }
       * 위와 같은 형식이며,
       * event는 이벤트 타입
       * data는 이벤트 데이터(json 형식), message에 실제 데이터가 있음
       */
      lines.forEach((line: string) => {
        if (line.startsWith('event:')) {
          parsedEvent.event = line.slice(6).trim();
        } else if (line.startsWith('data:')) {
          try {
            parsedEvent.data = JSON.parse(line.slice(5).trim());
          } catch (e) {
            console.log(e);
            parsedEvent.data = line.slice(5).trim();
          }
        }
      });

      console.log('SSE 이벤트 타입:', parsedEvent.event);
      console.log('SSE 데이터:', parsedEvent.data);
    };

    sse.onerror = (error) => {
      console.error('SSE 에러:', error);
      sse.close();
    };

    setEventSource(sse);
  }, [baseUrl]);

  const onSubmit = async () => {
    try {
      const coordinates = await getCurrentLocation();
      if (!coordinates) {
        throw new Error('위치 정보를 가져오지 못했습니다.');
      }

      autoMatchingForm.setValue(
        'startPoint',
        `${coordinates.lat},${coordinates.lng}`,
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
    console.log(data);
    try {
      subscribeToSSE();

      const response = await axios.post(
        `${baseUrl}/api/matching/auto/request`,
        data,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGEuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo2MDAwMDAwMDAwMH0.40DhQGzszXAawIW6XMJ08uAaYhulOF0x-9FYk0wr8SI`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error('매칭 요청 실패');
      }

      console.log('매칭 요청 성공');
    } catch (error) {
      console.error('매칭 요청 중 오류:', error);
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
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
