import { ManualInfo } from '@/components/home/manualMatching';

const Tags = ({ manualInfo }: { manualInfo: ManualInfo }) => {
  return (
    <div className="flex overflow-x-scroll scroll-hidden gap-2">
      {manualInfo.tags.map((tag) => {
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
  );
};

export default Tags;
