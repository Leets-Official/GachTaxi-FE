import MenuItem from './MenuItem';
import { MENUITEMS } from '@/constants';

const BottomMenu = () => {
  return (
    <div className="flex justify-around bg-secondary py-4">
      {MENUITEMS.map((item, index) => (
        <MenuItem key={index} Icon={item.icon} label={item.label} />
      ))}
    </div>
  );
};

export default BottomMenu;
