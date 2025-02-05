import Modal from './index';
import Button from '@/components/commons/Button';
import FillPlus from '@/assets/icon/chatPlusFriend.svg?react';
import EmptyPlus from '@/assets/icon/chatPlusTouchFriend.svg?react';
import { useState } from 'react';
import DefaultProfileImage from '@/assets/icon/basicProfileIcon.svg?react';
import postFriends from '@/libs/apis/friend/postFriends.api';
import postBlacklist from '@/libs/apis/blackList/postBlackList.api';
import { useToast } from '@/contexts/ToastContext';

interface ReportModalProps {
  onClose: () => void;
  senderName: string;
  profilePicture?: string;
  senderId: number;
}

const ReportModal: React.FC<ReportModalProps> = ({
  onClose,
  senderName,
  profilePicture,
  senderId,
}) => {
  const [isFriend, setIsFriend] = useState(false);
  const { openToast } = useToast();
  const validProfilePicture =
    profilePicture && profilePicture.trim() !== '' ? profilePicture : undefined;

  const toggleFriend = async () => {
    try {
      const res = await postFriends(senderName);
      if (res.code === 200) {
        setIsFriend((prev) => !prev);
        openToast(`${senderName}님이 친구로 추가되었습니다.`, 'success');
      } else {
        openToast(res.message, 'error');
      }
    } catch (error) {
      console.error('친구 추가 실패:', error);
    }
  };
  console.log(senderId);

  const handleBlacklist = async () => {
    try {
      const res = await postBlacklist(senderId);
      if (res.code === 201) {
        openToast(`${senderName}님이 블랙리스트에 추가되었습니다.`, 'success');
      } else {
        openToast(res.message, 'error');
      }
    } catch (error) {
      console.error('블랙리스트 등록 실패', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center gap-2 mb-7 gap-3">
        {validProfilePicture ? (
          <img
            src={validProfilePicture}
            alt={`${senderName}의 프로필`}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <DefaultProfileImage className="w-10 h-10 rounded-full" />
        )}
        <p className="text-white font-semibold text-header">{senderName}</p>
        <Button variant="icon" onClick={toggleFriend} className="w-7 h-7 mt-1">
          {isFriend ? <EmptyPlus /> : <FillPlus />}
        </Button>
      </div>
      <Button
        className="w-full h-[42px] bg-primary text-[#012619] py-3 rounded-full font-semibold flex items-center justify-center"
        onClick={handleBlacklist}
      >
        블랙리스트 추가
      </Button>
    </Modal>
  );
};

export default ReportModal;
