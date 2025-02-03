import MenuItem from './MenuItem';
import { MENUITEMS } from '@/constants';
import { useState } from 'react';
import SendAccountModal from '../modal/sendAccountModal';
import CallTaxiModal from '@/components/modal/CallTaxiModal';
import { useModal } from '@/contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import useWebSocket from '@/hooks/useWebSocket';
import CancelTaxiModal from '@/components/modal/CancelTaxiModal';
import CloseMatchingModal from '@/components/modal/CloseMatching';
import useTimerStore from '@/store/useTimerStore';
import { getCloseMatching } from '@/libs/apis/getCloseMatching.api';
import getExitChatRoom from '@/libs/apis/getExitChatRoom';
import useSSEStore from '@/store/useSSEStore';

const BottomMenu = ({
  onSendAccount,
  roomId,
}: {
  onSendAccount: (account: string) => void;
  roomId: number;
}) => {
  const { handleDisconnect } = useWebSocket(roomId);
  const { openModal } = useModal();
  const { closeModal } = useModal();
  const { openToast } = useToast();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const nav = useNavigate();
  const { messages } = useSSEStore();
  const [isOwner, setIsOwner] = useState(false);

  messages.forEach((eventMessage) => {
    if (eventMessage.message.topic === 'match_room_created') {
      const userId = localStorage.getItem('userId');
      setIsOwner(userId === String(eventMessage.message.roomMasterId));
    }
  });

  const handleSendClick = () => {
    setShowAccountModal(true);
  };

  const handleTaxiClick = () => {
    openModal(<CallTaxiModal />);
  };

  const handleExitClick = async () => {
    try {
      const { reset } = useTimerStore.getState();
      const [res, closeRes] = await Promise.all([
        getExitChatRoom(roomId),
        getCloseMatching(roomId),
      ]);
      if (res.chatExit.code === 200 && closeRes.matchingExit.code === 200) {
        closeModal();
        reset();
        nav('/home');
        handleDisconnect();
        openToast('채팅방을 나가고 매칭을 종료했습니다.', 'success');
      }
    } catch (error) {
      console.error('채팅방 퇴장 중 오류 발생:', error);
    }
  };

  const handleExitModal = () => {
    openModal(<CancelTaxiModal onConfirm={handleExitClick} />);
  };

  const handleCloseClick = async () => {
    try {
      const { reset } = useTimerStore.getState();
      const res = await getCloseMatching(roomId);
      if (res.matchingExit.code === 200) {
        closeModal();
        reset();
        openToast('매칭을 마감했습니다 택시를 호출해주세요!', 'success');
      }
    } catch (error) {
      console.error('매칭 마감 중 오류 발생', error);
    }
  };

  const handleCloseMatching = () => {
    openModal(<CloseMatchingModal onConfirm={handleCloseClick} />);
  };

  const clickHandlers: Record<string, () => void> = {
    '계좌 전송': isOwner ? handleSendClick : () => {},
    '택시 호출': isOwner ? handleTaxiClick : () => {},
    '매칭 마감': isOwner ? handleCloseMatching : () => {},
    '매칭 취소': handleExitModal,
  };

  return (
    <div className="flex justify-evenly py-8">
      {MENUITEMS.map((item, index) => (
        <div
          key={index}
          onClick={clickHandlers[item.label] || undefined}
          className={`${
            !isOwner && item.label !== '매칭 취소'
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          }`}
        >
          <MenuItem key={index} Icon={item.icon} label={item.label} />
        </div>
      ))}

      {showAccountModal && (
        <SendAccountModal
          onClose={() => setShowAccountModal(false)}
          account="농협 302 XXXX XXXX XX"
          onSend={(accountInfo) => {
            onSendAccount(accountInfo);
            setShowAccountModal(false);
          }}
        />
      )}
    </div>
  );
};

export default BottomMenu;
