import RouteSettingIcon from '@/assets/icon/smallRouteChangeIcon.svg?react';
import Button from '@/components/commons/Button';
import Tags from '@/components/home/manualMatching/matchingInfoItem/Tags';
import MatchingComplete from '@/components/modal/MatchingComplete';
import { useModal } from '@/contexts/ModalContext';
import { useToast } from '@/contexts/ToastContext';
import joinManualMatchingRoom from '@/libs/apis/manual/joinManualMatchingRoom.api';
import formatToKoreanTime from '@/utils/formatToKoreanTIme';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Room } from 'gachTaxi-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const { openToast } = useToast();
  const navigate = useNavigate();

  const handleJoinMatching = async () => {
    try {
      if (setCurrentPage) {
        const res = await joinManualMatchingRoom(manualInfo.roomId);
        if (res.code >= 200 && res.code < 300) {
          openModal(<MatchingComplete setCurrentPage={setCurrentPage} />);
        }
      } else {
        console.error('페이지 교체 setter 함수를 가져오지 못했어요!');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        openToast(errorMessage, 'error');
      }
    }
  };

  const handleJoinChatting = () => {
    navigate(`/chat/manual/${manualInfo.chattingRoomId}`);
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
            {formatToKoreanTime(manualInfo.departureTime)}
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
              {manualInfo.description ? manualInfo.description : 'X'}
            </p>
          </div>
        )}

        {manualInfo.tags.length > 0 ? (
          <Tags tags={manualInfo.tags} />
        ) : (
          <p className="font-medium text-captionheader text-textDarkGray">
            - 등록된 태그가 없어요!
          </p>
        )}
      </motion.div>

      {isExpand && (
        <div className="w-full">
          <Button
            className="w-full"
            isDisabled={
              currentPage === 'MANUAL' && manualInfo.currentMembers === 4
            }
            onClick={
              currentPage === 'MANUAL' ? handleJoinMatching : handleJoinChatting
            }
          >
            {currentPage === 'MANUAL'
              ? manualInfo.currentMembers === 4
                ? '참여마감'
                : '참여하기'
              : '채팅방 참가'}
          </Button>
        </div>
      )}
    </>
  );
};

export default MatchingInfoItem;
