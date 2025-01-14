import LargePlusIcon from '@/assets/icon/largePlusIcon.svg?react';
import { Link } from 'react-router-dom';
import MatchingInfoBox from '@/components/home/manualMatching/MatchingInfoBox';
import { ManualInfo } from '@/components/home/manualMatching';

interface MatchingPageProps {
  isOpen: boolean;
  manualInfos: ManualInfo[];
  setManualInfos: (manualInfos: ManualInfo[]) => void;
}

const MatchingPage = ({ isOpen, manualInfos }: MatchingPageProps) => {
  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        {manualInfos.map((manualInfo, idx) => {
          return (
            <Link key={idx} to={`/signup/verification`}>
              <MatchingInfoBox manualInfo={manualInfo} />
            </Link>
          );
        })}
      </div>
      {isOpen && (
        <div className="w-full flex absolute bottom-2">
          <Link to="/home/manual-register" className="ml-auto">
            <LargePlusIcon />
          </Link>
        </div>
      )}
    </>
  );
};

export default MatchingPage;
