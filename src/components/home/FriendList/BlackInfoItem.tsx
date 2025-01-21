import BasicProfileIcon from '@/assets/icon/basicProfileIcon.svg?react';
import Button from '@/components/commons/Button';
import { Friend } from '@/components/home/FriendList';
import BlackListDeleteIcon from '@/assets/icon/blackListDeleteIcon.svg?react';
import { useToast } from '@/contexts/ToastContext';

interface BlackInfoItemProps {
  blackMember: Friend;
  blackList: Friend[];
  setBlackList: (value: Friend[]) => void;
}

const BlackInfoItem = ({
  blackMember,
  setBlackList,
  blackList,
}: BlackInfoItemProps) => {
  const { openToast } = useToast();

  const handleBlackMember = () => {
    const updatedList = blackList.filter(
      (member) => member.id !== blackMember.id,
    );
    setBlackList(updatedList);
    openToast('블랙리스트에서 삭제되었어요');
  };

  return (
    <div className="bg-toastColor rounded-box p-vertical flex items-center justify-between h-[101px]">
      <div className="flex-1 flex items-center gap-[16px]">
        <div className="flex items-center gap-[10px] cursor-pointer relative rounded-full bg-textDarkGray">
          {blackMember.profileImage ? (
            <img
              className="w-[48px] h-[48px] rounded-full object-cover"
              src={blackMember.profileImage}
              alt="친구 프로필 이미지"
            />
          ) : (
            <BasicProfileIcon width={48} height={48} />
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-semibold text-captionHeader">
            {blackMember.nickName}
          </p>
          <span className="font-medium text-body text-textDarkGray">
            {blackMember.gender === 'MALE' ? '남자' : '여자'}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[16px]">
        <Button variant="icon" onClick={handleBlackMember}>
          <BlackListDeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default BlackInfoItem;
