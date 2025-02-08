import TAGS from '@/constants/tags.constant';

const Tags = ({ tags }: { tags: string[] }) => {
  const showLabel = (value: string) => {
    const tag = TAGS.find((tag) => tag.value === value);
    return tag ? tag.label : value;
  };

  return (
    <div className="flex overflow-x-scroll scroll-hidden gap-2">
      {tags.map((tag) => {
        return (
          <span
            key={tag}
            className="text-assistive min-w-fit text-black font-medium px-3 py-1 rounded-full bg-primary"
          >
            # {showLabel(tag)}
          </span>
        );
      })}
    </div>
  );
};

export default Tags;
