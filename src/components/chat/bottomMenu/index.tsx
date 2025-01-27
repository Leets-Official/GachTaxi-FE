import MenuItem from './MenuItem';
import { MENUITEMS } from '@/constants';
import { useState } from 'react';
import SendAccountModal from '../modal/sendAccountModal';
import CallTaxiModal from '@/components/modal/CallTaxiModal';
import { useModal } from '@/contexts/ModalContext';
import handleExitChatRoom from '@/libs/apis/handleExitChatRoom';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';

const BottomMenu = ({
  onSendAccount,
  roomId,
}: {
  onSendAccount: (account: string) => void;
  roomId: number;
}) => {
  const { openModal } = useModal();
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
      const res = await handleExitChatRoom(roomId);
      if (res.code === 200) {
        nav('/home');
        openToast(res.message, 'success');
      }
    } catch (error) {
      console.error('채팅방 퇴장 중 오류 발생:', error);
    }
  };

  const clickHandlers: Record<string, () => void> = {
    '계좌 전송': handleSendClick,
    '택시 호출': handleTaxiClick,
    '매칭 취소': handleExitClick,
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
