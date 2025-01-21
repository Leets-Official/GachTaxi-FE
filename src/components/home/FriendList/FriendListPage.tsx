import { Friend } from '@/components/home/FriendList';
import FriendInfoItem from '@/components/home/FriendList/FriendInfoItem';
import { Link } from 'react-router-dom';
import LargePlusIcon from '@/assets/icon/largePlusIcon.svg?react';
import EmptyView from '@/components/emptyView';

interface FriendListPageProps {
  friendList: Friend[];
  setFriendList: (friends: Friend[]) => void;
  isOpen: boolean;
  setCurrentPage: (value: 'FRIEND_LIST' | 'BLACK_LIST') => void;
}

const FriendListPage = ({
  friendList,
  isOpen,
  setCurrentPage,
}: FriendListPageProps) => {
  const hasFriend = friendList.length > 0;

  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        {hasFriend ? (
          friendList.map((friend, idx) => {
            return (
              <FriendInfoItem
                key={idx}
                setCurrentPage={setCurrentPage}
                friend={friend}
              />
            );
          })
        ) : (
          <EmptyView>친구를 추가해보세요!</EmptyView>
        )}
      </div>
      {isOpen && (
        <div className="w-full flex absolute bottom-2">
          <Link to="/home/friend-request" className="ml-auto button-shadow">
            <LargePlusIcon />
          </Link>
        </div>
      )}
    </>
  );
};

export default FriendListPage;
