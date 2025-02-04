import BasicProfileIcon from '@/assets/icon/basicProfileIcon.svg?react';
import Button from '@/components/commons/Button';
import FriendSendIcon from '@/assets/icon/friendSendIcon.svg?react';
import FriendSettingIcon from '@/assets/icon/friendSettingIcon.svg?react';
import { useModal } from '@/contexts/ModalContext';
import FriendDeleteOrBlack from '@/components/modal/FriendDeleteOrBlack';
import { Friend } from 'gachTaxi-types';

interface FriendInfoItemProps {
  friend: Friend;
  setCurrentPage: (value: 'FRIEND_LIST' | 'BLACK_LIST') => void;
}

const FriendInfoItem = ({ friend, setCurrentPage }: FriendInfoItemProps) => {
  const { openModal } = useModal();

  const handleFriendSetting = () => {
    if (setCurrentPage) {
      openModal(
        <FriendDeleteOrBlack
          id={friend.friendId}
          setCurrentPage={setCurrentPage}
        />,
      );
    } else {
      return null;
    }
  };

  return (
    <div className="bg-toastColor rounded-box p-vertical flex items-center justify-between h-[101px]">
      <div className="flex-1 flex items-center gap-4">
        <div className="flex items-center gap-[10px] cursor-pointer relative rounded-full bg-textDarkGray">
          {friend.friendProfileUrl ? (
            <img
              className="w-[48px] h-[48px] rounded-full object-cover"
              src={friend.friendProfileUrl}
              alt="친구 프로필 이미지"
            />
          ) : (
            <BasicProfileIcon width={48} height={48} />
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-semibold text-captionHeader">
            {friend.friendNickName}
          </p>
          <span className="font-medium text-body text-textDarkGray">
            {friend.gender === 'MALE' ? '남자' : '여자'}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[16px]">
        <Button variant="icon" onClick={handleFriendSetting}>
          <FriendSettingIcon />
        </Button>
        <Button variant="icon">
          <FriendSendIcon />
        </Button>
      </div>
    </div>
  );
};

export default FriendInfoItem;
