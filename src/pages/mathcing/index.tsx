import Button from '@/components/commons/Button';
import Timer from '@/components/matchingInfo/TImer';
import useSSEStore from '@/store/useSSEStore';
import useTimerStore from '@/store/useTimerStore';
import { useEffect, useState } from 'react';

const MatchingInfoPage = () => {
  const { reset } = useTimerStore();
  const { initializeSSE, messages } = useSSEStore();

  const [roomCapacity, setRoomCapacity] = useState<number>(0);
  const [roomStatus, setRoomStatus] = useState<'searching' | 'matching'>(
    'searching',
  );

  useEffect(() => {
    initializeSSE();
  }, [initializeSSE]);

  useEffect(() => {
    messages.forEach((message) => {
      switch (message.topic) {
        case 'match_member_joined':
          setRoomCapacity((prev) => Math.max(prev + 1, 4));
          break;

        case 'match_member_cancelled':
          setRoomCapacity((prev) => Math.max(prev - 1, 0));
          break;

        case 'match_room_created':
          setRoomCapacity((prev) => Math.max(prev + 1, 4));
          setRoomStatus('matching');
          break;

        default:
          break;
      }
    });
  }, [messages, reset]);

  return (
    <section className="flex-1 flex flex-col justify-between p-4">
      <div className="w-full flex flex-col items-center mt-20">
        {roomStatus === 'searching' ? (
          <p className="font-bold text-header text-center">
            매칭 방을 탐색중이에요! <br /> 조금만 기다려주세요!
          </p>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <p className="font-bold text-header text-center">
              가치 탈 사람 <br />
              찾는중...
            </p>
            <span className="font-medium text-captionHeader">
              {roomCapacity}/4
            </span>
          </div>
        )}
      </div>
      <div
        className={` w-full flex justify-center flex-col gap-2 items-center ${roomStatus === 'searching' ? 'flex-grow' : ''}`}
      >
        <Timer />
        <>택시아이콘자리</>
      </div>
      {roomStatus === 'matching' && (
        <div className=" w-full mb-4">
          <Button className="w-full" onClick={() => reset()}>
            채팅방
          </Button>
        </div>
      )}
    </section>
  );
};

export default MatchingInfoPage;
