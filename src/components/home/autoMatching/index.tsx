import MiniTaxiLogoIcon from '@/assets/icon/miniTaxiLogoIcon.svg?react';
import Button from '@/components/commons/Button';
import InviteMembers from '@/components/home/autoMatching/InviteMembers';
import RouteSetting from '@/components/home/autoMatching/RouteSetting';
import SelectTags from '@/components/home/autoMatching/SelectTags';
import { useState } from 'react';

export interface MatchingData {
  start: string;
  end: string;
  friends: string[];
  tags: string[];
}

const AutoMatching = ({ isOpen }: { isOpen: boolean }) => {
  const [matchingData, setMatchingData] = useState<MatchingData>({
    start: 'main gate',
    end: 'AI building',
    friends: [],
    tags: ['태그1', '태그2', '태그3'],
  });

  const handleRouteChange = () => {
    setMatchingData((prev) => {
      return {
        ...prev,
        start: prev.end,
        end: prev.start,
      };
    });
  };

  // 친구 추가 로직 확인 후 사용 예정
  // const handleInviteMembers = (member: string) => {
  //   setMatchingData((prev) => ({
  //     ...prev,
  //     friends: prev.friends.includes(member)
  //       ? prev.friends
  //       : [...prev.friends, member],
  //   }));
  // };

  return (
    <div
      className={`flex flex-col ${isOpen ? 'gap-[32px] h-fit' : 'h-[260px]'} justify-between`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-header font-bold">바로 매칭</h2>
        <MiniTaxiLogoIcon />
      </div>

      <div className="flex flex-col gap-[16px] h-fit max-h-[calc(100dvh-310px)] overflow-y-scroll scroll-hidden">
        <RouteSetting
          matchingData={matchingData}
          handleRouteChange={handleRouteChange}
        />
        {isOpen && (
          <>
            <InviteMembers />
            <SelectTags matchingData={matchingData} />
          </>
        )}
      </div>

      <div className="w-full">
        <Button variant="primary" className="w-full">
          매칭 시작
        </Button>
      </div>
    </div>
  );
};

export default AutoMatching;
