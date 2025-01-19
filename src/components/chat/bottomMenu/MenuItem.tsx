const MenuItem = ({ Icon, label }: { Icon: React.FC; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <Icon />
      <p className="text-captionBody text-textLightGray mt-2">{label}</p>
    </div>
  );
};

export default MenuItem;
