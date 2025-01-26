import LargePlusIcon from '@/assets/icon/largePlusIcon.svg?react';
import { Link } from 'react-router-dom';
import MatchingInfoItem from '@/components/home/manualMatching/matchingInfoItem';
import { ManualInfo } from '@/components/home/manualMatching';
import EmptyView from '@/components/emptyView';

interface MatchingPageProps {
  isOpen: boolean;
  manualInfos: ManualInfo[];
  setManualInfos: (manualInfos: ManualInfo[]) => void;
  currentPage: 'MANUAL' | 'MY_MATCHING';
  setCurrentPage: (value: 'MANUAL' | 'MY_MATCHING') => void;
}

const MatchingPage = ({
  isOpen,
  manualInfos,
  setCurrentPage,
  currentPage,
}: MatchingPageProps) => {
  const hasMatching = manualInfos.length > 0;

  return (
    <>
      <div
        className={`flex flex-col gap-4 ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        <p className="mb-4 font-medium text-body">
          함께하고 싶은 매칭이 있나요?
        </p>
        {hasMatching ? (
          manualInfos.map((manualInfo, idx) => {
            return (
              <MatchingInfoItem
                key={idx}
                setCurrentPage={setCurrentPage}
                manualInfo={manualInfo}
                currentPage={currentPage}
              />
            );
          })
        ) : (
          <EmptyView>현재 등록된 매칭이 없어요!</EmptyView>
        )}
      </div>
      {isOpen && (
        <div className="w-full flex absolute bottom-2">
          <Link to="/home/manual-register" className="ml-auto button-shadow">
            <LargePlusIcon />
          </Link>
        </div>
      )}
    </>
  );
};

export default MatchingPage;
