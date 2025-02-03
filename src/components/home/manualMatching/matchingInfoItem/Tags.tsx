const Tags = ({ tags }: { tags: string[] }) => {
  return (
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
  );
};

export default Tags;
