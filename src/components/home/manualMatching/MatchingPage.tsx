import Button from '@/components/commons/Button';
import LargePlusIcon from '@/assets/icon/largePlusIcon.svg?react';
import { Link } from 'react-router-dom';
import MatchingInfoBox from '@/components/home/manualMatching/MatchingInfoBox';

const MatchingPage = ({
  isOpen,
  manualInfos,
  setManualInfos,
}: {
  isOpen: boolean;
  manualInfos: any;
  setManualInfos: (any) => void;
}) => {
  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} min-h-[200px] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
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
          <Button
            variant="icon"
            className="ml-auto"
            onClick={() =>
              setManualInfos([
                {
                  // 임시 mock 데이터
                  time: '오전 08:50',
                  memberCount: 3,
                  route: 'basic',
                  tags: ['태그1', '태그2', '태그3'],
                },
              ])
            }
          >
            <LargePlusIcon />
          </Button>
        </div>
      )}
    </>
  );
};

export default MatchingPage;
