import { useState } from 'react';
import BottomMenu from './bottomMenu';
import ChatPlus from '@/assets/icon/chatPlus.svg?react';
import ChatX from '@/assets/icon/chatX.svg?react';
import ChatSend from '@/assets/icon/chatSend.svg?react';

const ChatInput = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [accountMessage, setAccountMessage] = useState('');

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAccountSend = (accountInfo: string) => {
    setAccountMessage(accountInfo);
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 max-w-[430px] w-full mx-auto">
      {showMenu && (
        <div className="w-full h-[144px] bg-secondary rounded-t-3xl">
          <BottomMenu onSendAccount={handleAccountSend} />
        </div>
      )}

      <div className="h-[64px] flex justify-between items-center px-4 bg-secondary">
        <button
          onClick={toggleMenu}
          className="rounded-full flex items-center justify-center"
        >
          {showMenu ? <ChatX /> : <ChatPlus />}
        </button>

        <input
          type="text"
          placeholder="메시지 입력"
          value={accountMessage}
          onChange={(e) => setAccountMessage(e.target.value)}
          className="flex-1 text-white bg-[#465443] rounded-full px-4 py-2 outline-none placeholder-black mx-4"
        />

        <button className="flex items-center justify-center">
          <ChatSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
