import BasicProfileIcon from '@/assets/icon/basicProfileIcon.svg?react';
import Button from '@/components/commons/Button';
import BlackListDeleteIcon from '@/assets/icon/blackListDeleteIcon.svg?react';
import { useToast } from '@/contexts/ToastContext';
import { BlackMember } from 'gachTaxi-types';
import useDeleteBlackList from '@/hooks/mutations/useDeleteBlackList';

interface BlackInfoItemProps {
  blackMember: BlackMember;
}

const BlackInfoItem = ({ blackMember }: BlackInfoItemProps) => {
  const { openToast } = useToast();
  const { mutate: deleteBlackList } = useDeleteBlackList();

  const handleBlackMember = () => {
    deleteBlackList(blackMember.receiverId, {
      onSuccess: (response) => {
        openToast(response.message, 'success');
      },
      onError: (error) => {
        openToast(error.message, 'error');
      },
    });
  };

  return (
    <div className="bg-toastColor rounded-box p-vertical flex items-center justify-between h-[101px]">
      <div className="flex-1 flex items-center gap-[16px]">
        <div className="flex items-center gap-[10px] cursor-pointer relative rounded-full bg-textDarkGray">
          {blackMember.profilePicture ? (
            <img
              className="w-[48px] h-[48px] rounded-full object-cover"
              src={blackMember.profilePicture}
              alt="친구 프로필 이미지"
            />
          ) : (
            <BasicProfileIcon width={48} height={48} />
          )}
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-semibold text-captionHeader">
            {blackMember.receiverNickname}
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
