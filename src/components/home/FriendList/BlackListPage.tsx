import EmptyView from '@/components/emptyView';
import BlackInfoItem from '@/components/home/FriendList/BlackInfoItem';
import useBlackList from '@/hooks/queries/useBlackList';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import { useIntersectionObserver } from '@/store/useIntersectionObserver';

interface BlackListPageProps {
  isOpen: boolean;
}

const BlackListPage = ({ isOpen }: BlackListPageProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useBlackList();
  const blackList = data.pages.flatMap((page) => page.response || []);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  if (isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        {blackList.length > 0 ? (
          blackList.map((blackMember) => {
            return (
              <BlackInfoItem
                key={blackMember.receiverId}
                blackMember={blackMember}
              />
            );
          })
        ) : (
          <EmptyView>블랙리스트에 추가한 사람이 없어요!</EmptyView>
        )}
      </div>
      {isFetchingNextPage && (
        <SpinnerIcon width={36} height={36} className="mx-auto spinner mt-5" />
      )}
      <div ref={ref}></div>
    </>
  );
};

export default BlackListPage;
