import Button from '@/components/commons/Button';
import { useState } from 'react';
import MatchingPage from '@/components/home/manualMatching/MatchingPage';
import HistoryPage from '@/components/home/manualMatching/HistoryPage';

const ManualMatching = ({ isOpen }: { isOpen: boolean }) => {
  const [manualInfos, setManualInfos] = useState([
    {
      // 임시 mock 데이터
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      // 임시 mock 데이터
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      // 임시 mock 데이터
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      time: '오전 08:50',
      memberCount: 3,
      route: 'basic',
      tags: ['태그1', '태그2', '태그3'],
    },
  ]);
  const [currentPage, setCurrentPage] = useState<'manual' | 'history'>(
    'manual',
  );

  const handlePageChange = () => {
    setCurrentPage((prev) => (prev === 'manual' ? 'history' : 'manual'));
  };

  return (
    <div className="flex flex-col gap-[32px] justify-between relative">
      <div className="flex items-center justify-start gap-3">
        <h2 className="text-header font-bold">
          {currentPage === 'manual' ? '수동 매칭' : '매칭 내역'}
        </h2>
        <Button
          variant="icon"
          className="underline text-textDarkGray"
          onClick={handlePageChange}
        >
          {currentPage === 'manual' ? '매칭 내역' : '수동 매칭'}
        </Button>
      </div>

      {currentPage === 'manual' ? (
        <MatchingPage
          isOpen={isOpen}
          manualInfos={manualInfos}
          setManualInfos={setManualInfos}
        />
      ) : (
        <HistoryPage />
      )}
    </div>
  );
};

export default ManualMatching;
