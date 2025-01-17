import CallTaxi from '@/assets/icon/callTaxi.svg?react';
import SendAccount from '@/assets/icon/sendAccount.svg?react';
import CancelMatching from '@/assets/icon/cancelMatching.svg?react';
import CloseMatching from '@/assets/icon/closeMatching.svg?react';

const menuItems = [
  { icon: CallTaxi, label: '택시 호출' },
  { icon: SendAccount, label: '계좌 전송' },
  { icon: CloseMatching, label: '매칭 마감' },
  { icon: CancelMatching, label: '매칭 취소' },
];

const BottomMenu = () => {
  return (
    <div className="flex justify-around bg-secondary py-4">
      {menuItems.map((item, index) => (
        <MenuItem key={index} Icon={item.icon} label={item.label} />
      ))}
    </div>
  );
};

const MenuItem = ({ Icon, label }: { Icon: React.FC; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <Icon />
      <p className="text-captionBody text-textLightGray mt-2">{label}</p>
    </div>
  );
};

export default BottomMenu;
