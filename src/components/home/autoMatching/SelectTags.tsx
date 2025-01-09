import { MatchingData } from '@/components/home/autoMatching';

const SelectTags = ({ matchingData }: { matchingData: MatchingData }) => {
  const tags: string[] = matchingData.tags;

  return (
    <div className="h-[101px] flex-shrink-0 bg-secondary rounded-box p-vertical flex flex-col justify-between">
      <p className="font-medium text-captionHeader">키워드 선택</p>
      <div className="flex overflow-x-scroll scroll-hidden gap-2">
        {tags.map((tag) => {
          return (
            <span
              key={tag}
              className="text-assistive min-w-fit text-black font-medium px-3 py-1 rounded-full bg-primary"
            >
              # {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SelectTags;
