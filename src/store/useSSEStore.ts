import { EventSourcePolyfill } from '@/utils/EventSourcePolyfill';
import { MatchingEvent, MessagesArray } from 'gachTaxi-types';
import { create } from 'zustand';

interface SSEState {
  sse: EventSourcePolyfill | null;
  messages: MessagesArray;
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
      console.error('엑세스 토큰이 없습니다!');
      return;
    }

    if (get().sse) {
      console.log('이미 구독 중이므로 재구독을 방지합니다.');
      return;
    }

    const sse = new EventSourcePolyfill(
      `${BASE_URL}/api/matching/auto/subscribe`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      },
    );

    sse.onmessage = (event: MessageEvent) => {
      const rawData = event.data;
      const formatedData: MatchingEvent = rawData.startsWith('data:')
        ? JSON.parse(rawData.split('data:')[1].trim())
        : JSON.parse(rawData);

      set((state) => {
        return { messages: [...state.messages, formatedData] };
      });
    };

    sse.onerror = (error) => {
      console.error('SSE 에러 발생:', error);
      sse.close();

      setTimeout(() => {
        console.log('SSE 재연결 시도');
        get().initializeSSE();
      }, 5000);
    };

    console.log('SSE 구독 시작');
    return { sse };
  },

  closeSSE: () => {
    set((state) => {
      state.sse?.close();
      return { sse: null, messages: [] };
    });
  },
}));

export default useSSEStore;
