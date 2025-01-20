import { ManualInfo } from '@/components/home/manualMatching';
import MatchingInfoItem from '@/components/home/manualMatching/matchingInfoItem';

const MyMatchingPage = ({ isOpen }: { isOpen: boolean }) => {
  const myMatchingInfos: ManualInfo[] = [
    {
      // 임시 mock 데이터
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
      content: '반갑다!!',
    },
  ];

  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        <p className="mb-4 font-medium text-body">
          참여중인 매칭 리스트를 확인할 수 있어요!
        </p>
        {myMatchingInfos.map((manualInfo, idx) => {
          return <MatchingInfoItem key={idx} manualInfo={manualInfo} />;
        })}
      </div>
    </>
  );
};

export default MyMatchingPage;
