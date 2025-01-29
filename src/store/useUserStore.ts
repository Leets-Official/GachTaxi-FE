import { MemberResponseDto } from 'gachTaxi-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: MemberResponseDto | null;
  setUser: (user: MemberResponseDto | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: MemberResponseDto | null) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user' },
  ),
);

export default useUserStore;
