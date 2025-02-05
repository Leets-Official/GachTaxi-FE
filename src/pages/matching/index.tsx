import { useEffect, useState } from 'react';
import Button from '@/components/commons/Button';
import Timer from '@/components/matchingInfo/TImer';
import useSSEStore from '@/store/useSSEStore';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@/assets/icon/matching-loading/circleIcon.svg?react';
import TaxiIcon from '@/assets/icon/matching-loading/taxiSideIcon.svg?react';
import useChattingRoomIdStore from '@/store/useChattingRoomId';
import { MessagesArray } from 'gachTaxi-types';

const MatchingInfoPage = () => {
  const { initializeSSE, messages } = useSSEStore();
  const { chattingRoomId, setChattingRoomId } = useChattingRoomIdStore();
  const navigate = useNavigate();

  const [roomCapacity, setRoomCapacity] = useState<number>(0);
  const [roomStatus, setRoomStatus] = useState<'searching' | 'matching'>(
    'searching',
  );

  const [lastProcessedMessageId, setLastProcessedMessageId] = useState<
    string | null
  >(null);

  useEffect(() => {
    initializeSSE();
  }, [initializeSSE]);

  useEffect(() => {
    if (messages.length === 0) return;

    const latestMessage: MessagesArray = messages[messages.length - 1];

    if (latestMessage.message.topic === lastProcessedMessageId) return;

    switch (latestMessage.message.topic) {
      case 'match_member_joined':
        setRoomCapacity((prev) => Math.min(prev + 1, 4)); // 최대 4명 제한
        setChattingRoomId(latestMessage.message.roomId.toString());
        setRoomStatus('matching');
        break;

      case 'match_member_cancelled':
        setRoomCapacity((prev) => Math.max(prev - 1, 0)); // 최소 0명 제한
        break;

      case 'match_room_created':
        setRoomCapacity((prev) => Math.min(prev + 1, 4));
        setChattingRoomId(latestMessage.message.roomId.toString());
        setRoomStatus('matching');
        break;

      default:
        break;
    }

    setLastProcessedMessageId(latestMessage.message.topic); // 처리한 메시지 ID 저장
  }, [messages, setChattingRoomId, lastProcessedMessageId]);

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
            <p className="font-medium text-captionHeader text-center">
              {roomCapacity}/4
            </p>
          </div>
        )}
      </div>
      <div
        className={`w-full flex justify-center flex-col gap-2 items-center ${roomStatus === 'searching' ? 'flex-grow mb-[100px]' : 'mb-20'}`}
      >
        <Timer />
        <div className="relative">
          <CircleIcon className="spinner" />
          <TaxiIcon className="z-10 absolute top-10 right-5" />
        </div>
      </div>
      {roomStatus === 'matching' && (
        <div className="w-full mb-4">
          <Button
            className="w-full"
            onClick={() => navigate(`/chat/auto/${chattingRoomId!}`)}
          >
            채팅방
          </Button>
        </div>
      )}
    </section>
  );
};

export default MatchingInfoPage;
