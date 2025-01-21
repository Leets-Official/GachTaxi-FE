import Button from '@/components/commons/Button';
import BlackListPage from '@/components/home/FriendList/BlackListPage';
import FriendListPage from '@/components/home/FriendList/FriendListPage';
import { useState } from 'react';

export interface Friend {
  id: number;
  profileImage?: string;
  nickName: string;
  gender: 'MALE' | 'FEMALE';
}

const FriendList = ({ isOpen }: { isOpen: boolean }) => {
  const [friendList, setFriendList] = useState<Friend[]>([]);

  const [blackList, setBlackList] = useState<Friend[]>([]);

  const [currentPage, setCurrentPage] = useState<'FRIEND_LIST' | 'BLACK_LIST'>(
    'FRIEND_LIST',
  );

  const handlePageChange = () => {
    setCurrentPage((prev) =>
      prev === 'FRIEND_LIST' ? 'BLACK_LIST' : 'FRIEND_LIST',
    );
  };

  const renderConditionalComponents = () => {
    if (currentPage === 'FRIEND_LIST') {
      return (
        <FriendListPage
          friendList={friendList}
          setFriendList={setFriendList}
          isOpen={isOpen}
          setCurrentPage={setCurrentPage}
        />
      );
    } else {
      return (
        <BlackListPage
          blackList={blackList}
          setBlackList={setBlackList}
          isOpen={isOpen}
        />
      );
    }
  };

  return (
    <div className="flex flex-col gap-[32px] justify-between relative">
      <div className="flex items-center justify-start gap-3">
        <h2 className="text-header font-bold">
          {currentPage === 'FRIEND_LIST' ? '친구 목록' : '블랙리스트'}
        </h2>
        <Button
          variant="icon"
          className="underline text-textDarkGray"
          onClick={handlePageChange}
        >
          {currentPage === 'FRIEND_LIST' ? '블랙리스트' : '친구 목록'}
        </Button>
      </div>

      {renderConditionalComponents()}
    </div>
  );
};

export default FriendList;
