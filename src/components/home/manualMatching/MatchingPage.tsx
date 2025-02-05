import LargePlusIcon from '@/assets/icon/largePlusIcon.svg?react';
import { Link } from 'react-router-dom';
import MatchingInfoItem from '@/components/home/manualMatching/matchingInfoItem';
import EmptyView from '@/components/emptyView';
import useManualMatchingList from '@/hooks/queries/useManualMatchingList';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import { useIntersectionObserver } from '@/store/useIntersectionObserver';

interface MatchingPageProps {
  isOpen: boolean;
  currentPage: 'MANUAL' | 'MY_MATCHING';
  setCurrentPage: (value: 'MANUAL' | 'MY_MATCHING') => void;
}

const MatchingPage = ({
  isOpen,
  setCurrentPage,
  currentPage,
}: MatchingPageProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useManualMatchingList();
  const manualMatchingList = data.pages.flatMap((page) => page.rooms || []);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

  if (isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        {manualMatchingList.length > 0 ? (
          <>
            {manualMatchingList.map((manualInfo) => (
              <MatchingInfoItem
                key={manualInfo.roomId}
                setCurrentPage={setCurrentPage}
                manualInfo={manualInfo}
                currentPage={currentPage}
              />
            ))}
            <div ref={ref} className="h-0" />
          </>
        ) : (
          <EmptyView>현재 등록된 매칭이 없어요!</EmptyView>
        )}
      </div>
      {isFetchingNextPage && (
        <SpinnerIcon width={36} height={36} className="mx-auto spinner mt-5" />
      )}
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
