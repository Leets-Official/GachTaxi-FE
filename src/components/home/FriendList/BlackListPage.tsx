import { Friend } from '@/components/home/FriendList';
import BlackInfoItem from '@/components/home/FriendList/BlackInfoItem';

interface BlackListPageProps {
  blackList: Friend[];
  setBlackList: (friends: Friend[]) => void;
  isOpen: boolean;
}

const BlackListPage = ({
  blackList,
  setBlackList,
  isOpen,
}: BlackListPageProps) => {
  return (
    <>
      <div
        className={`flex flex-col gap-[16px] ${isOpen ? '' : 'pb-[calc(100dvh-430px)]'} h-[calc(100dvh-225px)] max-h-[calc(100dvh-225px)] overflow-y-scroll scroll-hidden`}
      >
        {blackList.map((blackMember, idx) => {
          return (
            <BlackInfoItem
              key={idx}
              blackList={blackList}
              blackMember={blackMember}
              setBlackList={setBlackList}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlackListPage;
