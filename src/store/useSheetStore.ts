import { create } from 'zustand';

interface SheetStore {
  isOpen: boolean;
  modalContent: {
    home: boolean;
    match: boolean;
    friend: boolean;
  };
  openHome: () => void;
  openMatch: () => void;
  openFriend: () => void;
  openSheet: () => void;
  closeSheet: () => void;
}

// 바텀 시트의 열림, 닫힘, 어떤 콘텐츠를 렌더링하고 있었는지를 저장하는 스토어
const useSheetStore = create<SheetStore>((set) => ({
  modalContent: {
    home: true,
    match: false,
    friend: false,
  },
  openHome: () =>
    set({ modalContent: { home: true, match: false, friend: false } }),
  openMatch: () =>
    set({ modalContent: { home: false, match: true, friend: false } }),
  openFriend: () =>
    set({ modalContent: { home: false, match: false, friend: true } }),
  isOpen: false,
  openSheet: () => set({ isOpen: true }),
  closeSheet: () => set({ isOpen: false }),
}));

export default useSheetStore;
