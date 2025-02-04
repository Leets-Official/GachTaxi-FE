import EmptyView from '@/components/emptyView';
import MatchingInfoItem from '@/components/home/manualMatching/matchingInfoItem';
import useMyMatchingList from '@/hooks/queries/useMyMatchingList';
import { useIntersectionObserver } from '@/store/useIntersectionObserver';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';

const MyMatchingPage = ({ isOpen }: { isOpen: boolean }) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMyMatchingList();
  const myMatchingList = data.pages.flatMap((page) => page.rooms || []);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  if (isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        <p className="mb-3 font-medium text-body">
          참여중인 매칭 리스트를 확인할 수 있어요!
        </p>
        {myMatchingList.length > 0 ? (
          myMatchingList.map((myInfo) => {
            return <MatchingInfoItem key={myInfo.roomId} manualInfo={myInfo} />;
          })
        ) : (
          <EmptyView>매칭 내역이 없어요!</EmptyView>
        )}
      </div>
      {isFetchingNextPage && (
        <SpinnerIcon width={36} height={36} className="mx-auto spinner mt-5" />
      )}
      <div ref={ref}></div>
    </>
  );
};

export default MyMatchingPage;
