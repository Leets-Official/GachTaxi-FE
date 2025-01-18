import { Controller, Control, Path } from 'react-hook-form';
import { MatchingSchema } from 'gachTaxi-types';
import MemberItem from '@/components/home/autoMatching/inviteMembers/MemberItem';

interface InviteMembersProps<T extends MatchingSchema> {
  control: Control<T>;
}

const InviteMembers = <T extends MatchingSchema>({
  control,
}: InviteMembersProps<T>) => {
  const members: string[] = ['친구 1', '친구 2', '친구 3'];

  // safeValue 친구 리스트에 선택된 값이 포함되어 있는지 검사하고 업데이트시키는 함수
  const handleUpdateMembers = (
    safeValue: string[],
    selectedMemnbers: string,
  ) => {
    const updatedMembers = safeValue.includes(selectedMemnbers)
      ? safeValue.filter((member) => member !== selectedMemnbers)
      : [...safeValue, selectedMemnbers];

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
              {members.map((member) => (
                <MemberItem
                  key={member}
                  tag={member}
                  isSelected={safeValue.includes(member)}
                  onClick={(selectedMemnbers) => {
                    const updatedMembers = handleUpdateMembers(
                      safeValue,
                      selectedMemnbers,
                    );
                    onChange(updatedMembers);
                  }}
                />
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default InviteMembers;
