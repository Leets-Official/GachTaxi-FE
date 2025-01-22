import BottomSheet from '@/components/home/BottomSheet';
import Navbar from '@/components/home/Navbar';
import useSheetStore from '@/store/useSheetStore';
import { Suspense, lazy } from 'react';

const KakaoMap = lazy(() => import('@/components/home/KakaoMap'));

const HomePage = () => {
  const { modalContent } = useSheetStore();

  return (
    <section className="w-full flex-1 overflow-hidden relative bg-neutral">
      <Suspense fallback={<div className="bg-white h-[85vh]">로딩중...</div>}>
        <KakaoMap />
      </Suspense>
      <BottomSheet modalContent={modalContent} />
      <Navbar modalContent={modalContent} />
    </section>
  );
};

export default HomePage;
