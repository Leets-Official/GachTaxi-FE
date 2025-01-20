interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="items-center mt-[15%] h-[82px]">
      <h1 className="text-[24px] font-bold mb-[8px]">{title}</h1>
      <p className="text-body text-textLightGray">
        {subtitle.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

export default Header;
