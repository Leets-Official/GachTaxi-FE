import MenuItem from './MenuItem';
import { MENUITEMS } from '@/constants';
import { useEffect, useState } from 'react';
import SendAccountModal from '../modal/sendAccountModal';
import CallTaxiModal from '@/components/modal/CallTaxiModal';
import { useModal } from '@/contexts/ModalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import useWebSocket from '@/hooks/useWebSocket';
import CancelTaxiModal from '@/components/modal/CancelTaxiModal';
import CloseMatchingModal from '@/components/modal/CloseMatching';
import useTimerStore from '@/store/useTimerStore';
import { getCloseMatching } from '@/libs/apis/getCloseMatching.api';
import getExitChatRoom from '@/libs/apis/getExitChatRoom';
import useSSEStore from '@/store/useSSEStore';
import useUserStore from '@/store/useUserStore';
import useChattingRoomIdStore from '@/store/useChattingRoomId';
import { MessagesArray } from 'gachTaxi-types';
import exitManualMatchingRoom from '@/libs/apis/manual/exitManualMatchingRoom.api';
//import exitManualMatchingRoom from '@/libs/apis/manual/exitManualMatchingRoom.api';

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
  const { messages, closeSSE } = useSSEStore();
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useUserStore();
  const { setChattingRoomId } = useChattingRoomIdStore();
  const accountNumber = user?.accountNumber || '계좌번호 없음';
  const { reset } = useTimerStore();
  const { pathname } = useLocation();

  const isAutoMatchingChat = pathname.includes('auto');

  useEffect(() => {
    if (messages) {
      const eventMessage: MessagesArray | undefined = messages.find(
        (event) => event.message.topic === 'match_room_created',
      );

      if (
        eventMessage &&
        eventMessage.message.topic === 'match_room_created' &&
        user
      ) {
        console.log(eventMessage);
        if (isAutoMatchingChat) {
          setIsOwner(user.userId === eventMessage.message.roomMasterId);
        } else {
          setIsOwner(true);
        }
      }
    }
  }, [messages, user, isAutoMatchingChat]);

  const handleSendClick = () => {
    if (!user?.accountNumber) {
      openToast('등록된 계좌번호가 없습니다.', 'error');
      return;
    }
    setShowAccountModal(true);
  };

  const handleTaxiClick = () => {
    openModal(<CallTaxiModal />);
  };

  const handleExitClickFromManual = async () => {
    try {
      const [res1, res2] = await Promise.all([
        getExitChatRoom(roomId),
        exitManualMatchingRoom(roomId),
      ]);
      if (
        res1.code >= 200 &&
        res1.code < 300 &&
        res2.code >= 200 &&
        res2.code < 300
      ) {
        closeModal();
        reset();
        nav('/home');
        handleDisconnect();
        setChattingRoomId('');
        openToast('채팅방을 나가고 매칭을 종료했습니다.', 'success');
      }
    } catch (error) {
      console.error('채팅방 퇴장 중 오류 발생:', error);
    }
  };

  const handleExitClickFromAuto = async () => {
    try {
      const [res1, res2] = await Promise.all([
        getExitChatRoom(roomId),
        getCloseMatching(roomId),
      ]);
      if (
        res1.code >= 200 &&
        res1.code < 300 &&
        res2.code >= 200 &&
        res2.code < 300
      ) {
        closeModal();
        reset();
        closeSSE();
        nav('/home');
        handleDisconnect();
        setChattingRoomId('');
        openToast('채팅방을 나가고 매칭을 종료했습니다.', 'success');
      }
    } catch (error) {
      console.error('채팅방 퇴장 중 오류 발생:', error);
    }
  };

  const handleExitModal = () => {
    openModal(
      <CancelTaxiModal
        onConfirm={
          isAutoMatchingChat
            ? handleExitClickFromAuto
            : handleExitClickFromManual
        }
      />,
    );
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
    '계좌 전송': handleSendClick,
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
            item.label !== '계좌 전송' && !isOwner && item.label !== '매칭 취소'
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
          account={accountNumber}
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
