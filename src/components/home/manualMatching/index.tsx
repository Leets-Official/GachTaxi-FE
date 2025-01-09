import Button from '@/components/commons/Button';
import MatchingInfoBox from '@/components/home/manualMatching/MatchingInfoBox';
import { useState } from 'react';
import LargePlusIcon from '@/assets/icon/largePlusIcon.svg?react';
import { Link } from 'react-router-dom';

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

  const handleInfo = () => {
    setManualInfos([
      {
        time: '오전 08:50',
        memberCount: 3,
        route: 'basic',
        tags: ['태그1', '태그2', '태그3'],
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-[32px] justify-between relative">
      <div className="flex items-center justify-between">
        <h2 className="text-header font-bold">수동 매칭</h2>
      </div>

      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-vertical h-[200px]'} h-fit max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        {manualInfos.map((manualInfo) => {
          return (
            <Link to={`/signup/verification`}>
              <MatchingInfoBox manualInfo={manualInfo} />
            </Link>
          );
        })}
      </div>
      {isOpen && (
        <div className="w-full flex absolute bottom-2">
          <Button variant="icon" className="ml-auto">
            <LargePlusIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ManualMatching;
