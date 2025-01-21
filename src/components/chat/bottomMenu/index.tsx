import MenuItem from './MenuItem';
import { MENUITEMS } from '@/constants';
import { useState } from 'react';
import SendAccountModal from '../modal/sendAccountModal';

const BottomMenu = ({
  onSendAccount,
}: {
  onSendAccount: (account: string) => void;
}) => {
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleSendClick = () => {
    setShowAccountModal(true);
  };

  return (
    <div className="flex justify-evenly py-8">
      {MENUITEMS.map((item, index) => (
        <div
          key={index}
          onClick={item.label === '계좌 전송' ? handleSendClick : undefined}
          className="cursor-pointer"
        >
          <MenuItem key={index} Icon={item.icon} label={item.label} />
        </div>
      ))}

      {showAccountModal && (
        <SendAccountModal
          onClose={() => setShowAccountModal(false)}
          account="농협 302 XXXX XXXX XX"
          onSend={(accountInfo) => {
            onSendAccount(accountInfo);
            setShowAccountModal(false);
          }}
        />
      )}
    </div>
  );
};

export default BottomMenu;
