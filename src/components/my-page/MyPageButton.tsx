import { useChangeButtonData } from '@/hooks/useChangeButtonData';

const MyPageButton = () => {
  const buttons = useChangeButtonData();

  return (
    <div className="w-[98%] flex flex-col gap-[25px] pb-[30px]">{buttons}</div>
  );
};

export default MyPageButton;
