import { EventSourcePolyfill } from '@/utils/EventSourcePolyfill';
import { create } from 'zustand';

interface SSEState {
  sse: EventSourcePolyfill | null;
  messages: string[];
  initializeSSE: () => void;
  closeSSE: () => void;
  addMessage: (message: string) => void;
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
        console.log('SSE 메시지 수신:', event.data);
        set((state) => ({
          messages: [...state.messages, event.data],
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
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));

export default useSSEStore;
