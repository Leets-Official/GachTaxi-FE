import Button from '@/components/commons/Button';
import TImer from '@/components/matchingInfo/TImer';
import useTimerStore from '@/store/useTimerStore';

const MatchingInfoPage = () => {
  const { reset } = useTimerStore();

  return (
    <section className="flex-1 flex flex-col justify-between p-4">
      <div className="w-full flex flex-col items-center mt-20">
        <p className="font-bold text-header text-center">
          매칭 방을 탐색중이에요! <br /> 조금만 기다려주세요!
        </p>
      </div>
      <div className=" w-full flex justify-center flex-col gap-2 items-center">
        <TImer />
        <>택시아이콘자리</>
      </div>
      <div className=" w-full mb-4">
        <Button className="w-full" onClick={() => reset()}>
          채팅방
        </Button>
      </div>
    </section>
  );
};

export default MatchingInfoPage;
