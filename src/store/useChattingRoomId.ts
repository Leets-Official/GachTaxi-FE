import { create } from 'zustand';

interface ChattingRoomIdState {
  chattingRoomId: string;
  setChattingRoomId: (roomId: string) => void;
}

const useChattingRoomIdStore = create<ChattingRoomIdState>((set) => ({
  chattingRoomId: '1',
  setChattingRoomId: (roomId: string) => set({ chattingRoomId: roomId }),
}));

export default useChattingRoomIdStore;
