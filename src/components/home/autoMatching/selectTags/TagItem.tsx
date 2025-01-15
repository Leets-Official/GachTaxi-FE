interface TagItemProps {
  tag: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
}

const TagItem = ({ tag, isSelected, onClick }: TagItemProps) => {
  return (
    <span
      className={`text-assistive min-w-fit  font-medium px-3 py-1 rounded-full cursor-pointer ${
        isSelected ? 'bg-primary text-black' : 'bg-neutral text-white'
      }`}
      onClick={() => onClick(tag)}
    >
      # {tag}
    </span>
  );
};

export default TagItem;
