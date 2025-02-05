import { MatchingSchema } from 'gachTaxi-types';
import { Control, Controller, Path } from 'react-hook-form';

interface AddContentProps<T extends MatchingSchema> {
  control: Control<T>;
}

const AddContent = <T extends MatchingSchema>({
  control,
}: AddContentProps<T>) => {
  return (
    <Controller
      control={control}
      name={'description' as Path<T>}
      render={({ field: { onChange } }) => (
        <div className="h-[312px] flex-shrink-0 bg-secondary rounded-box p-vertical gap-3 flex flex-col justify-between">
          <p className="font-medium text-captionHeader">추가 내용</p>
          <textarea
            className="w-full h-full p-vertical bg-transparent rounded-box border border-textDarkGray placeholder:font-medium placeholder:text-body resize-none outline-none"
            placeholder="추가 내용을 입력해주세요"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </div>
      )}
    />
  );
};

export default AddContent;
