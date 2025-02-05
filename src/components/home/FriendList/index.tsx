import Button from '@/components/commons/Button';
import BlackListPage from '@/components/home/FriendList/BlackListPage';
import FriendListPage from '@/components/home/FriendList/FriendListPage';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import { Suspense, useState } from 'react';

const FriendList = ({ isOpen }: { isOpen: boolean }) => {
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
        <Suspense
          fallback={
            <div className="h-[150px] w-full flex items-center justify-center">
              <SpinnerIcon width={36} height={36} className="mx-auto spinner" />
            </div>
          }
        >
          <FriendListPage isOpen={isOpen} setCurrentPage={setCurrentPage} />
        </Suspense>
      );
    } else {
      return (
        <Suspense
          fallback={
            <div className="h-[150px] w-full flex items-center justify-center">
              <SpinnerIcon width={36} height={36} className="mx-auto spinner" />
            </div>
          }
        >
          <BlackListPage isOpen={isOpen} />
        </Suspense>
      );
    }
  };

  return (
    <div className="flex flex-col gap-[32px] justify-between relative">
      <div className="flex items-center justify-start gap-3 ">
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
