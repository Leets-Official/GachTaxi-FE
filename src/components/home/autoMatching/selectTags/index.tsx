import { Controller, Control, Path } from 'react-hook-form';
import TagItem from '@/components/home/autoMatching/selectTags/TagItem';
import { MatchingSchema } from 'gachTaxi-types';
import TAGS from '@/constants/tags.constant';

interface SelectTagsProps<T extends MatchingSchema> {
  control: Control<T>;
}

const SelectTags = <T extends MatchingSchema>({
  control,
}: SelectTagsProps<T>) => {
  // safeValue 태그 리스트에 선택된 값이 포함되어 있는지 검사하고 업데이트시키는 함수
  const handleUpdateTags = (safeValue: string[], selectedTag: string) => {
    const updatedTags = safeValue.includes(selectedTag)
      ? safeValue.filter((tag) => tag !== selectedTag)
      : [...safeValue, selectedTag];

    return updatedTags;
  };

  return (
    <Controller
      control={control}
      name={'criteria' as Path<T>}
      render={({ field: { value = [], onChange } }) => {
        const safeValue: string[] = Array.isArray(value) ? value : [];

        return (
          <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col justify-between">
            <p className="font-medium text-captionHeader">키워드 선택</p>
            <div className="flex overflow-x-scroll scroll-hidden gap-2">
              {TAGS.map(({ label, value }) => (
                <TagItem
                  key={value}
                  tag={label}
                  isSelected={safeValue.includes(value)}
                  onClick={() => {
                    const updatedTags = handleUpdateTags(safeValue, value);
                    onChange(updatedTags);
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

export default SelectTags;
