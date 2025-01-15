interface MemberItemProps {
  tag: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
}

const MemberItem = ({ tag, isSelected, onClick }: MemberItemProps) => {
  return (
    <span
      className={`text-assistive min-w-fit font-medium px-4 py-1 rounded-full cursor-pointer ${
        isSelected ? 'bg-primary text-black' : 'bg-neutral text-white'
      }`}
      onClick={() => onClick(tag)}
    >
      {tag}
    </span>
  );
};

export default MemberItem;
