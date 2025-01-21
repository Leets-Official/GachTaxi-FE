import EmptyView from '@/components/emptyView';
import { ManualInfo } from '@/components/home/manualMatching';
import MatchingInfoItem from '@/components/home/manualMatching/matchingInfoItem';

const MyMatchingPage = ({ isOpen }: { isOpen: boolean }) => {
  const myMatchingInfos: ManualInfo[] = [];

  const hasMyMatching = myMatchingInfos.length > 0;

  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        <p className="mb-4 font-medium text-body">
          참여중인 매칭 리스트를 확인할 수 있어요!
        </p>
        {hasMyMatching ? (
          myMatchingInfos.map((manualInfo, idx) => {
            return <MatchingInfoItem key={idx} manualInfo={manualInfo} />;
          })
        ) : (
          <EmptyView>매칭 내역이 없어요!</EmptyView>
        )}
      </div>
    </>
  );
};

export default MyMatchingPage;
