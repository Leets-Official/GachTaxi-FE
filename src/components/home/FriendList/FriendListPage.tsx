import FriendInfoItem from '@/components/home/FriendList/FriendInfoItem';
import { Link } from 'react-router-dom';
import LargePlusIcon from '@/assets/icon/largePlusIcon.svg?react';
import EmptyView from '@/components/emptyView';
import useFriends from '@/hooks/queries/useFriends';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import { useIntersectionObserver } from '@/store/useIntersectionObserver';

interface FriendListPageProps {
  isOpen: boolean;
  setCurrentPage: (value: 'FRIEND_LIST' | 'BLACK_LIST') => void;
}

const FriendListPage = ({ isOpen, setCurrentPage }: FriendListPageProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFriends();
  const friendList = data.pages.flatMap((page) => page.response || []);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  if (isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        {friendList.length > 0 ? (
          friendList.map((friend) => {
            return (
              <FriendInfoItem
                key={friend.friendId}
                setCurrentPage={setCurrentPage}
                friend={friend}
              />
            );
          })
        ) : (
          <EmptyView>친구를 추가해보세요!</EmptyView>
        )}
      </div>
      {isFetchingNextPage && (
        <SpinnerIcon width={36} height={36} className="mx-auto spinner mt-5" />
      )}
      <div ref={ref}></div>
      {isOpen && (
        <div className="w-full flex absolute bottom-10">
          <Link to="/home/friend-request" className="ml-auto button-shadow">
            <LargePlusIcon />
          </Link>
        </div>
      )}
    </>
  );
};

export default FriendListPage;
