import RouteSettingIcon from '@/assets/icon/smallRouteChangeIcon.svg?react';
import Button from '@/components/commons/Button';
import Tags from '@/components/home/manualMatching/matchingInfoItem/Tags';
import MatchingComplete from '@/components/modal/MatchingComplete';
import { useModal } from '@/contexts/ModalContext';
import { motion } from 'framer-motion';
import { Room } from 'gachTaxi-types';
import { useState } from 'react';

interface MatchingInfoItem {
  manualInfo: Room;
  setCurrentPage?: (value: 'MANUAL' | 'MY_MATCHING') => void;
  currentPage?: 'MANUAL' | 'MY_MATCHING';
}

const MatchingInfoItem = ({
  manualInfo,
  setCurrentPage,
  currentPage,
}: MatchingInfoItem) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const animateState = isExpand ? 'expanded' : 'collapsed';
  const { openModal } = useModal();

  const handleJoinMatching = () => {
    try {
      if (setCurrentPage) {
        openModal(<MatchingComplete setCurrentPage={setCurrentPage!} />);
      } else {
        console.error('페이지 교체 setter 함수를 가져오지 못했어요!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <motion.div
        role="matching-box"
        initial="collapsed"
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        animate={animateState}
        variants={{
          collapsed: { height: '160px', overflow: 'hidden' },
          expanded: { height: '310px' },
        }}
        onClick={() => setIsExpand((prev) => !prev)}
        className={`min-h-[144px] flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col gap-3 ${isExpand ? 'border-primary border-2' : ''}`}
      >
        <div className="flex w-full justify-between items-center">
          <span className="text-header font-bold">
            {manualInfo.departureTime}
          </span>
          <span className="text-body font-medium relative top-[-8px]">
            {manualInfo.currentMembers}/4
          </span>
        </div>

        <div className="flex items-center gap-3">
          <RouteSettingIcon />
          <div className="relative top-[-2px]">
            <p className="font-medium text-captionHeader">
              {manualInfo.departure}
            </p>
            <p className="font-medium text-captionHeader">
              {manualInfo.destination}
            </p>
          </div>
        </div>

        {isExpand && (
          <div className="flex-1 overflow-y-scroll scroll-hidden overflow-hidden mt-5">
            <p className="font-medium text-body">
              <span>추가 멘트 : </span>
              {manualInfo.description}
            </p>
          </div>
        )}

        <Tags tags={manualInfo.tags} />
      </motion.div>
      {isExpand && currentPage! && (
        <div className="w-full">
          <Button
            className="w-full"
            isDisabled={manualInfo.currentMembers === 4}
            onClick={handleJoinMatching}
          >
            {manualInfo.currentMembers === 4 ? '참여마감' : '참여하기'}
          </Button>
        </div>
      )}
    </>
  );
};

export default MatchingInfoItem;
