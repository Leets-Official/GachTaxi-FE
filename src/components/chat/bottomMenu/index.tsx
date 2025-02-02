import MenuItem from './MenuItem';
import { MENUITEMS } from '@/constants';
import { useState } from 'react';
import SendAccountModal from '../modal/sendAccountModal';
import CallTaxiModal from '@/components/modal/CallTaxiModal';
import { useModal } from '@/contexts/ModalContext';
import handleExitChatRoom from '@/libs/apis/handleExitChatRoom';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import useWebSocket from '@/hooks/useWebSocket';
import CancelTaxiModal from '@/components/modal/CancelTaxiModal';
import CloseMatchingModal from '@/components/modal/CloseMatching';
import useTimerStore from '@/store/useTimerStore';

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

  const handleSendClick = () => {
    setShowAccountModal(true);
  };

  const handleTaxiClick = () => {
    openModal(<CallTaxiModal />);
  };

  const handleExitClick = async () => {
    try {
      const { reset } = useTimerStore.getState();
      const res = await handleExitChatRoom(roomId);
      if (res.chatExit.code === 200 && res.matchingExit.code === 200) {
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

  const handleOpenExitModal = () => {
    openModal(<CancelTaxiModal onConfirm={handleExitClick} />);
  };

  const handleCloseMatching = () => {
    openModal(<CloseMatchingModal />);
  };

  const clickHandlers: Record<string, () => void> = {
    '계좌 전송': handleSendClick,
    '택시 호출': handleTaxiClick,
    '매칭 마감': handleCloseMatching,
    '매칭 취소': handleOpenExitModal,
  };

  return (
    <div className="flex justify-evenly py-8">
      {MENUITEMS.map((item, index) => (
        <div
          key={index}
          onClick={clickHandlers[item.label] || undefined}
          className="cursor-pointer"
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
