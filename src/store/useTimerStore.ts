import { create } from 'zustand';

interface TimerState {
  timer: number;
  startTime: number | null;
  timerInterval: ReturnType<typeof setInterval> | null;
  start: () => void;
  reset: () => void;
}

const useTimerStore = create<TimerState>((set, get) => ({
  timer: 0,
  startTime: null,
  timerInterval: null,

  start: () => {
    if (get().timerInterval) return;

    const storedStartTime = localStorage.getItem('startTime');
    const now = Date.now();
    const startTime = storedStartTime ? parseInt(storedStartTime, 10) : now;

    if (!storedStartTime) {
      localStorage.setItem('startTime', now.toString());
    }

    set({ startTime });

    const timerInterval = setInterval(() => {
      const currentStartTime = get().startTime;
      if (currentStartTime) {
        const elapsed = Math.floor((Date.now() - currentStartTime) / 1000);
        set({ timer: elapsed });
      }
    }, 1000);

    set({ timerInterval });
  },

  reset: () => {
    const timerInterval = get().timerInterval;
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    localStorage.removeItem('startTime');
    set({ timer: 0, startTime: null, timerInterval: null });
  },
}));

export default useTimerStore;
