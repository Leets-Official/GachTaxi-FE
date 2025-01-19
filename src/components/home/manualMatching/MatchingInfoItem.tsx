import RouteSettingIcon from '@/assets/icon/smallRouteChangeIcon.svg?react';
import Button from '@/components/commons/Button';
import { ManualInfo } from '@/components/home/manualMatching';
import MatchingComplete from '@/components/modal/MatchingComplete';
import { useModal } from '@/contexts/ModalContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MatchingInfoItem {
  manualInfo: ManualInfo;
  setCurrentPage?: (value: 'MANUAL' | 'MY_MATCHING') => void;
}

const MatchingInfoItem = ({ manualInfo, setCurrentPage }: MatchingInfoItem) => {
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
          <span className="text-header font-bold">{manualInfo.time}</span>
          <span className="text-body font-medium relative top-[-8px]">
            {manualInfo.memberCount}/4
          </span>
        </div>

        <div className="flex items-center gap-3">
          <RouteSettingIcon />
          <div className="relative top-[-2px]">
            <p className="font-medium text-captionHeader">
              {manualInfo.route === 'basic' ? '가천대 정문' : 'AI 공학관'}
            </p>
            <p className="font-medium text-captionHeader">
              {manualInfo.route === 'basic' ? 'AI 공학관' : '가천대 정문'}
            </p>
          </div>
        </div>

        {isExpand && (
          <div className="flex-1 overflow-y-scroll overflow-hidden mt-5">
            <p className="font-medium text-body">
              <span>추가 멘트 : </span>
              {manualInfo.content}
            </p>
          </div>
        )}

        <div className="flex overflow-x-scroll scroll-hidden gap-2">
          {manualInfo.tags.map((tag) => {
            return (
              <span
                key={tag}
                className="text-assistive min-w-fit text-black font-medium px-3 py-1 rounded-full bg-primary"
              >
                # {tag}
              </span>
            );
          })}
        </div>
      </motion.div>
      {isExpand && (
        <div className="w-full">
          <Button
            className="w-full"
            isDisabled={manualInfo.memberCount === 4}
            onClick={handleJoinMatching}
          >
            {manualInfo.memberCount === 4 ? '참여마감' : '참여하기'}
          </Button>
        </div>
      )}
    </>
  );
};

export default MatchingInfoItem;
