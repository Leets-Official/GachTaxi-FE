import BottomSheet from '@/components/home/BottomSheet';
import ChatLinkButton from '@/components/home/chatLink';
import Navbar from '@/components/home/Navbar';
import useChattingRoomIdStore from '@/store/useChattingRoomId';
import useSheetStore from '@/store/useSheetStore';
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

const KakaoMap = lazy(() => import('@/components/home/KakaoMap'));

const HomePage = () => {
  const { modalContent } = useSheetStore();
  const { chattingRoomId } = useChattingRoomIdStore();

  return (
    <section className="w-full flex-1 overflow-hidden relative bg-neutral">
      {chattingRoomId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full flex justify-center h-fit absolute top-14 z-30"
        >
          <ChatLinkButton chattingRoomId={chattingRoomId} />
        </motion.div>
      )}
      <Suspense fallback={<div className="bg-white h-[85vh]">로딩중...</div>}>
        <KakaoMap />
      </Suspense>
      <BottomSheet modalContent={modalContent} />
      <Navbar modalContent={modalContent} />
    </section>
  );
};

export default HomePage;
