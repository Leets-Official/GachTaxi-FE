import MenuItem from './MenuItem';
import { MENUITEMS } from '@/constants';

const BottomMenu = () => {
  return (
    <div className="flex justify-evenly py-8">
      {MENUITEMS.map((item, index) => (
        <MenuItem key={index} Icon={item.icon} label={item.label} />
      ))}
    </div>
  );
};

export default BottomMenu;
