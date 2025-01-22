import Button from '@/components/commons/Button';

const FriendRequestNotification = () => {
  return (
    <div className="bg-secondary rounded-box w-full h-[101px] flex flex-col p-vertical justify-between">
      <p className="font-bold text-captionHeader">
        이용자님이 친구요청을 보냈어요
      </p>
      <div className="flex justify-end h-[30px] gap-2">
        <Button className="w-[92px] h-full">수락</Button>
        <Button
          variant="secondary"
          className="w-[92px] h-full border-white border-[1px]"
        >
          거절
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestNotification;
