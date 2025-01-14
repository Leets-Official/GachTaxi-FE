import Button from '@/components/commons/Button';
import PlusIcon from '@/assets/icon/plusIcon.svg?react';

const InviteMembers = () => {
  return (
    <div className="min-h-[101px] h-fit flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col justify-between">
      <Button
        variant="icon"
        className="w-fit flex justify-between items-center gap-2"
      >
        <p className="font-medium text-captionHeader">친구 초대</p>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default InviteMembers;
