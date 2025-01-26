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
    const accessToken = localStorage.getItem('accessToken');
    const sse = new EventSourcePolyfill(
      `${BASE_URL}/api/matching/auto/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    set({ sse });

    sse.onmessage = (event: MessageEvent) => {
      const lines = event.data.split('\n');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedEvent: { event?: string; data?: any } = {};
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
      set((state) => ({
        messages: [...state.messages, event.data],
      }));
    };

    sse.onerror = (error) => {
      console.error('SSE 에러:', error);
      sse.close();
    };
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
