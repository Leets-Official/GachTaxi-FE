import Button from '@/components/commons/Button';
import { useState } from 'react';
import MatchingPage from '@/components/home/manualMatching/MatchingPage';
import MyMatchingPage from '@/components/home/manualMatching/MyMatchingPage';

interface ManualMatchingProps {
  isOpen: boolean;
}

export interface ManualInfo {
  time: string;
  memberCount: number;
  route: string;
  tags: string[];
  content: string;
}

const ManualMatching = ({ isOpen }: ManualMatchingProps) => {
  const [manualInfos, setManualInfos] = useState<ManualInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<'MANUAL' | 'MY_MATCHING'>(
    'MANUAL',
  );

  const handlePageChange = () => {
    setCurrentPage((prev) => (prev === 'MANUAL' ? 'MY_MATCHING' : 'MANUAL'));
  };

  const renderConditionalComponents = () => {
    if (currentPage === 'MANUAL') {
      return (
        <MatchingPage
          isOpen={isOpen}
          manualInfos={manualInfos}
          setManualInfos={setManualInfos}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      );
    } else {
      return <MyMatchingPage isOpen={isOpen} />;
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
