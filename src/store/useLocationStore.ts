import { create } from 'zustand';

interface LocationStroe {
  autoDestinationPoint: string;
  autoDestinationName: string;
  autoStartPoint: string;
  setAutoDestinationPoint: (point: string) => void;
  setAutoStartPoint: (point: string) => void;
  setAutoDestinationName: (name: string) => void;
  manualDestinationPoint: string;
  manualDestinationName: string;
  setManualDestinationPoint: (point: string) => void;
  setManualDestinationName: (name: string) => void;
}

// 자동 & 수동 매칭의 목적지 이름 및 좌표를 저장하는 스토어
const useLocationStore = create<LocationStroe>((set) => ({
  // 자동 매칭 스토어
  autoDestinationPoint: '',
  autoStartPoint: '',
  autoDestinationName: '',
  setAutoDestinationPoint: (point) => set({ autoDestinationPoint: point }),
  setAutoStartPoint: (point) => set({ autoStartPoint: point }),
  setAutoDestinationName: (name) => set({ autoDestinationName: name }),

  // 수동 매칭 스토어
  manualDestinationPoint: '',
  manualDestinationName: '',
  setManualDestinationPoint: (point: string) =>
    set({ manualDestinationPoint: point }),
  setManualDestinationName: (name: string) =>
    set({ manualDestinationPoint: name }),
}));

export default useLocationStore;
