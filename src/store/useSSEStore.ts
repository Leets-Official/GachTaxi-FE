import { EventSourcePolyfill } from '@/utils/EventSourcePolyfill';
import { MessagesArray } from 'gachTaxi-types';
import { create } from 'zustand';

interface SSEState {
  sse: EventSourcePolyfill | null;
  messages: MessagesArray;
  initializeSSE: () => void;
  closeSSE: () => void;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSSEStore = create<SSEState>((set) => ({
  sse: null,
  messages: [],
  initializeSSE: () => {
    set((state) => {
      if (state.sse) {
        console.log('이미 구독 중이므로 재구독을 방지합니다.');
        return state;
      }

      const accessToken = localStorage.getItem('accessToken');
      const sse = new EventSourcePolyfill(
        `${BASE_URL}/api/matching/auto/subscribe`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );

      sse.onmessage = (event: MessageEvent) => {
        const formatedData = JSON.parse(event.data.split('data:')[1].trim());
        set((state) => ({
          messages: [...state.messages, formatedData],
        }));
      };

      sse.onerror = (error) => {
        console.error('SSE 에러 발생:', error);
        sse.close();
      };

      console.log('SSE 구독 시작');
      return { sse };
    });
  },

  closeSSE: () => {
    set((state) => {
      state.sse?.close();
      return { sse: null };
    });
  },
}));

export default useSSEStore;
