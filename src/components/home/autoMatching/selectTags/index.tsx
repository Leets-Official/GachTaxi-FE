import { Controller, Control, Path } from 'react-hook-form';
import TagItem from '@/components/home/autoMatching/selectTags/TagItem';
import { MatchingSchema } from 'gachTaxi-types';

interface SelectTagsProps<T extends MatchingSchema> {
  control: Control<T>;
}

const SelectTags = <T extends MatchingSchema>({
  control,
}: SelectTagsProps<T>) => {
  const tags: string[] = ['태그 1', '태그 2', '태그 3'];

  return (
    <Controller
      control={control}
      name={'tags' as Path<T>}
      render={({ field: { value = [], onChange } }) => {
        const safeValue: string[] = Array.isArray(value) ? value : [];

        return (
          <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col justify-between">
            <p className="font-medium text-captionHeader">키워드 선택</p>
            <div className="flex overflow-x-scroll scroll-hidden gap-2">
              {tags.map((tag) => (
                <TagItem
                  key={tag}
                  tag={tag}
                  isSelected={value.includes(tag)}
                  onClick={(selectedTag) => {
                    const updatedTags = safeValue.includes(selectedTag)
                      ? safeValue.filter((tag) => tag !== selectedTag)
                      : [...safeValue, selectedTag];
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
