import { Controller, Control, Path } from 'react-hook-form';
import { MatchingSchema } from 'gachTaxi-types';
import MemberItem from '@/components/home/autoMatching/inviteMembers/MemberItem';
import useFriends from '@/hooks/queries/useFriends';
import { useIntersectionObserver } from '@/store/useIntersectionObserver';
import { Link } from 'react-router-dom';

interface InviteMembersProps<T extends MatchingSchema> {
  control: Control<T>;
}

const InviteMembers = <T extends MatchingSchema>({
  control,
}: InviteMembersProps<T>) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFriends();
  const members = data.pages.flatMap((page) => page.response || []);
  const { isIntersecting, ref } = useIntersectionObserver();

  if (isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  // safeValue 친구 리스트에 선택된 값이 포함되어 있는지 검사하고 업데이트시키는 함수
  const handleUpdateMembers = (
    safeValue: string[],
    selectedMembers: string,
  ) => {
    const updatedMembers = safeValue.includes(selectedMembers)
      ? safeValue.filter((member) => member !== selectedMembers)
      : [...safeValue, selectedMembers];

    return updatedMembers;
  };

  return (
    <Controller
      control={control}
      name={'members' as Path<T>}
      render={({ field: { value = [], onChange } }) => {
        const safeValue: string[] = Array.isArray(value) ? value : [];

        return (
          <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col justify-between">
            <p className="font-medium text-captionHeader">친구 초대</p>
            <div className="flex overflow-x-scroll scroll-hidden gap-2">
              {members.length > 0 ? (
                <>
                  {members.map((member) => (
                    <MemberItem
                      key={member.friendsId}
                      tag={member.friendsNickName}
                      isSelected={safeValue.includes(member.friendsNickName)}
                      onClick={(selectedMembers) => {
                        const updatedMembers = handleUpdateMembers(
                          safeValue,
                          selectedMembers,
                        );
                        onChange(updatedMembers);
                      }}
                    />
                  ))}
                  <div ref={ref}></div>
                </>
              ) : (
                <Link
                  to="/home/friend-request"
                  className="font-medium text-textDarkGray text-captionHeader"
                >
                  친구를 추가해보세요!
                </Link>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default InviteMembers;
