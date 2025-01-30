import Modal from './index';
import Button from '@/components/commons/Button';
import FillPlus from '@/assets/icon/chatPlusFriend.svg?react';
import EmptyPlus from '@/assets/icon/chatPlusTouchFriend.svg?react';
import { useState } from 'react';

interface ReportModalProps {
  onClose: () => void;
  senderName: string;
  profilePicture: string;
}

const ReportModal: React.FC<ReportModalProps> = ({
  onClose,
  senderName,
  profilePicture,
}) => {
  const [isFriend, setIsFriend] = useState(false);

  const toggleFriend = () => {
    setIsFriend((prev) => !prev);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center gap-2 mb-7 gap-3">
        <img
          src={profilePicture}
          alt="프로필"
          className="w-10 h-10 rounded-full"
        />
        <p className="text-white font-semibold text-header">{senderName}</p>
        <Button variant="icon" onClick={toggleFriend} className="w-7 h-7 mt-1">
          {isFriend ? <EmptyPlus /> : <FillPlus />}
        </Button>
      </div>
      <Button className="w-full h-[42px] bg-primary text-[#012619] py-3 rounded-full font-semibold flex items-center justify-center">
        블랙리스트 추가
      </Button>
    </Modal>
  );
};

export default ReportModal;
