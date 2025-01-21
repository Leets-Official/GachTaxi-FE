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

const AutoMatching = ({ isOpen }: { isOpen: boolean }) => {
  const autoMatchingForm = useForm<z.infer<typeof autoMatchingSchema>>({
    resolver: zodResolver(autoMatchingSchema),
    defaultValues: {
      startPoint: '37.45054647474689,127.12683685293844',
      startName: '가천대 정문',
      destinationPoint: '37.45531332196219,127.13454171595741',
      destinationName: '가천대 AI 공학관',
      members: [],
      criteria: [],
      expectedTotalCharge: 4800,
    },
    mode: 'onBlur',
  });

  const { getCurrentLocation } = useGeoLocation();

  const [eventSource, setEventSource] = useState<EventSourcePolyfill | null>(null);

  // 컴포넌트 언마운트시 구독 종료
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

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

  // 목적지 정보 업데이트
  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(updateDestinationCoordinates);
    } else {
      console.error('카카오맵 api 동작 오류');
    }
  }, [updateDestinationCoordinates]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // SSE 구독
  const subscribeToSSE = useCallback(() => {
    const sse = new EventSourcePolyfill(`${baseUrl}/api/matching/auto/subscribe`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGEuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo2MDAwMDAwMDAwMH0.40DhQGzszXAawIW6XMJ08uAaYhulOF0x-9FYk0wr8SI`
      },
      withCredentials: true
    });

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
  }, []);

  const handleSubmitToAutoMatching: SubmitHandler<AutoMatchingTypes> = async (
    data,
  ) => {
    console.log(data);
    try {
      subscribeToSSE();

      const response = await fetch(`${baseUrl}/api/matching/auto/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhQGEuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo2MDAwMDAwMDAwMH0.40DhQGzszXAawIW6XMJ08uAaYhulOF0x-9FYk0wr8SI`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
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

  const handleError = (errors: FieldValues) => {
    console.error(errors);
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
          handleSubmitToAutoMatching(autoMatchingForm.getValues());
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
