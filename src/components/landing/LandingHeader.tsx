interface HeaderProps {
  title: string;
  subtitle: React.ReactNode;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="items-center mt-[15%] h-[82px]">
      <h1 className="text-[24px] font-bold mb-[8px]">{title}</h1>
      <div className="text-body text-textLightGray">{subtitle}</div>
    </div>
  );
};

export default Header;
