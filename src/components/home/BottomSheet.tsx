import { OFFSET_THRESHOLD, DELTA_THRESHOLD } from '@/constants';
import { motion, useDragControls } from 'framer-motion';
import ViewerControlIcon from '@/assets/icon/viewerControlIcon.svg?react';
import AutoMatching from '@/components/home/autoMatching';
import ManualMatching from '@/components/home/manualMatching';
import FriendList from '@/components/home/FriendList';
import useSheetStore from '@/store/useSheetStore';

interface MatchingSheetProps {
  modalContent: {
    home: boolean;
    match: boolean;
    friend: boolean;
  };
}

const BottomSheet = ({ modalContent }: MatchingSheetProps) => {
  const { isOpen, openSheet, closeSheet } = useSheetStore();
  const dragControls = useDragControls();
  const animateState = isOpen ? 'opend' : 'closed';

  return (
    <motion.div
      role="Viewer"
      className="absolute left-0 top-0 w-full mx-auto h-[100lvh] touch-none bg-neutral rounded-t-common will-change-transform p-vertical flex flex-col gap-[16px] z-30"
      drag="y"
      dragConstraints={{
        top: 0, // opend 상태일 때 드래그 제한 적용
        bottom: 0,
      }}
      dragElastic={0.3}
      dragControls={dragControls}
      dragListener={false}
      initial={isOpen ? 'opend' : 'closed'}
      transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
      animate={animateState}
      variants={{
        opend: { top: `5vh` },
        closed: { top: `calc(100dvh - 376px)` },
      }}
      onDragEnd={(_event, info) => {
        const isOverOffsetThreshold =
          Math.abs(info.offset.y) > OFFSET_THRESHOLD;
        const isOverDeltaThreshold = Math.abs(info.delta.y) > DELTA_THRESHOLD;

        const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;
        if (!isOverThreshold) return;

        if (info.offset.y < 0) {
          openSheet();
        } else {
          closeSheet();
        }
      }}
    >
      <motion.div
        role="Viewer Control Button"
        className="w-full flex justify-center items-center cursor-grab h-[40px] my-[-16px] flex-shrink-0"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <ViewerControlIcon />
      </motion.div>
      <div
        className={`${isOpen ? 'overflow-scroll scroll-hidden' : 'overflow-hidden'}`}
      >
        {modalContent.home && <AutoMatching isOpen={isOpen} />}
        {modalContent.match && <ManualMatching isOpen={isOpen} />}
        {modalContent.friend && <FriendList isOpen={isOpen} />}
      </div>
    </motion.div>
  );
};

export default BottomSheet;
