import { EventSourcePolyfill } from '@/utils/EventSourcePolyfill';
import { MatchingEvent, MessagesArray, EventType } from 'gachTaxi-types';
import { create } from 'zustand';

interface SSEState {
  sse: EventSourcePolyfill | null;
  messages: MessagesArray[];
  initializeSSE: () => void;
  closeSSE: () => void;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSSEStore = create<SSEState>((set, get) => ({
  sse: null,
  messages: [],

  initializeSSE: () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('❌ 엑세스 토큰이 없습니다! SSE를 시작할 수 없습니다.');
      return;
    }

    set((state): Partial<SSEState> => {
      if (state.sse) {
        console.log('🔄 이미 SSE 구독 중이므로 재구독을 방지합니다.');
        return state;
      }

      const sse = new EventSourcePolyfill(
        `${BASE_URL}/api/matching/auto/subscribe`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );

      sse.onmessage = (event: MessageEvent) => {
        const rawData = event.data.trim();
        const eventLines = rawData.split('\n');

        let eventType: EventType = 'init'; // 기본값 설정
        let jsonData = '';

        eventLines.forEach((line: string) => {
          if (line.startsWith('event:')) {
            eventType = line.slice(6).trim() as EventType;
          } else if (line.startsWith('data:')) {
            jsonData = line.slice(5).trim();
          }
        });

        if (!jsonData) return;

        try {
          const parsedData: MatchingEvent = JSON.parse(jsonData);
          set((state) => ({
            messages: [...state.messages, { eventType, message: parsedData }],
          }));
        } catch (error) {
          console.error('⚠️ JSON 파싱 오류 발생:', error);
        }
      };

      sse.onerror = () => {
        console.error(
          '🚨 SSE 연결 오류 발생! 연결을 종료하고 5초 후 재연결을 시도합니다.',
        );
        sse.close();
        set({ sse: null });

        setTimeout(() => {
          get().initializeSSE();
        }, 5000);
      };

      return { sse };
    });

    console.log('✅ SSE 구독 시작');
  },

  closeSSE: () => {
    set((state) => {
      if (state.sse) {
        console.log('🔌 SSE 연결 종료');
        state.sse.close();
      }
      return { sse: null, messages: [] }; // messages 초기화 유지 필요 시 수정 가능
    });
  },
}));

export default useSSEStore;
