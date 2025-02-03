import { EventSourcePolyfill } from '@/utils/EventSourcePolyfill';
import { MatchingEvent, MessagesArray } from 'gachTaxi-types';
import { create } from 'zustand';

interface SSEState {
  sse: EventSourcePolyfill | null;
  messages: MessagesArray;
  initializeSSE: () => void;
  closeSSE: () => void;
  isOwner: boolean;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSSEStore = create<SSEState>((set, get) => ({
  sse: null,
  messages: [],
  isOwner: false,

  initializeSSE: () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('엑세스 토큰이 없습니다!');
      return;
    }

    set((state): Partial<SSEState> => {
      if (state.sse) {
        console.log('이미 구독 중이므로 재구독을 방지합니다.');
        return state; // 기존 상태 유지
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

        if (!rawData.startsWith('data:')) {
          return;
        }

        const jsonString = rawData.slice(5).trim();
        try {
          const formatedData: MatchingEvent = JSON.parse(jsonString);

          if (formatedData.topic === 'match_room_created') {
            const userId = localStorage.getItem('userId');
            const isOwner = userId === String(formatedData.roomMasterId);

            set({ isOwner });
          }
          set((state) => ({ messages: [...state.messages, formatedData] }));
        } catch (error) {
          console.error('JSON 파싱 중 오류가 발생했습니다. : ', error);
        }
      };

      sse.onerror = () => {
        console.error('SSE 에러 발생, 연결 종료 후 재연결 시도');
        sse.close();

        // ✅ 상태 업데이트 (재연결 가능하도록 sse: null 설정)
        set({ sse: null });

        setTimeout(() => {
          get().initializeSSE();
        }, 5000);
      };

      return { sse };
    });

    console.log('SSE 구독 시작');
  },

  closeSSE: () => {
    set((state) => {
      state.sse?.close();
      return { sse: null, messages: [], isOwner: false };
    });
  },
}));

export default useSSEStore;
