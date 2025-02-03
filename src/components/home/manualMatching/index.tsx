import Button from '@/components/commons/Button';
import { Suspense, useState } from 'react';
import MatchingPage from '@/components/home/manualMatching/MatchingPage';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import MyMatchingPage from '@/components/home/manualMatching/MyMatchingPage';

interface ManualMatchingProps {
  isOpen: boolean;
}

const ManualMatching = ({ isOpen }: ManualMatchingProps) => {
  const [currentPage, setCurrentPage] = useState<'MANUAL' | 'MY_MATCHING'>(
    'MANUAL',
  );

  const handlePageChange = () => {
    setCurrentPage((prev) => (prev === 'MANUAL' ? 'MY_MATCHING' : 'MANUAL'));
  };

  const renderConditionalComponents = () => {
    if (currentPage === 'MANUAL') {
      return (
        <Suspense
          fallback={
            <div className="h-[150px] w-full flex items-center justify-center flex-1">
              <SpinnerIcon width={36} height={36} className="mx-auto spinner" />
            </div>
          }
        >
          <MatchingPage
            isOpen={isOpen}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Suspense>
      );
    } else {
      return (
        <Suspense
          fallback={
            <div className="h-[150px] w-full flex items-center justify-center flex-1">
              <SpinnerIcon width={36} height={36} className="mx-auto spinner" />
            </div>
          }
        >
          <MyMatchingPage isOpen={isOpen} />
        </Suspense>
      );
    }
  };

  return (
    <div className="flex flex-col gap-[32px] justify-between relative">
      <div className="flex items-center justify-start gap-3">
        <h2 className="text-header font-bold">
          {currentPage === 'MANUAL' ? '수동 매칭' : '나의 매칭'}
        </h2>
        <Button
          variant="icon"
          className="underline text-textDarkGray"
          onClick={handlePageChange}
        >
          {currentPage === 'MANUAL' ? '나의 매칭' : '수동 매칭'}
        </Button>
      </div>

      {renderConditionalComponents()}
    </div>
  );
};

export default ManualMatching;
