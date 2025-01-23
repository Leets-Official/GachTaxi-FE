import { create } from 'zustand';

interface LocationStore {
  auto: {
    destinationPoint: string;
    destinationName: string;
    startPoint: string;
  };
  manual: {
    destinationPoint: string;
    destinationName: string;
  };
  setAuto: {
    setStartPoint: (point: string) => void;
    setDestinationPoint: (point: string) => void;
    setDestinationName: (name: string) => void;
  };
  setManual: {
    setDestinationPoint: (point: string) => void;
    setDestinationName: (name: string) => void;
  };
}

const useLocationStore = create<LocationStore>((set) => ({
  auto: {
    destinationPoint: '',
    destinationName: '',
    startPoint: '',
  },
  manual: {
    destinationPoint: '',
    destinationName: '',
  },
  setAuto: {
    setStartPoint: (point) =>
      set((state) => ({
        auto: { ...state.auto, startPoint: point },
      })),
    setDestinationPoint: (point) =>
      set((state) => ({
        auto: { ...state.auto, destinationPoint: point },
      })),
    setDestinationName: (name) =>
      set((state) => ({
        auto: { ...state.auto, destinationName: name },
      })),
  },
  setManual: {
    setDestinationPoint: (point) =>
      set((state) => ({
        manual: { ...state.manual, destinationPoint: point },
      })),
    setDestinationName: (name) =>
      set((state) => ({
        manual: { ...state.manual, destinationName: name },
      })),
  },
}));

export default useLocationStore;
