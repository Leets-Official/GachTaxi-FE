import { useState } from 'react';
import BottomMenu from './BottomMenu';
import ChatPlus from '@/assets/icon/chatPlus.svg?react';
import ChatX from '@/assets/icon/chatX.svg?react';
import ChatSend from '@/assets/icon/chatSend.svg?react';

const ChatInput = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="h-[55px] flex items-center gap-2 p-4">
        <button
          onClick={toggleMenu}
          className="rounded-full flex items-center justify-center"
        >
          {showMenu ? <ChatX /> : <ChatPlus />}
        </button>

        <input
          type="text"
          placeholder="메시지 입력"
          className="flex-1 text-white bg-[#465443] rounded-full px-4 py-2 outline-none placeholder-black"
        />

        <button className="flex items-center justify-center">
          <ChatSend />
        </button>
      </div>

      {showMenu && <BottomMenu />}
    </>
  );
};

export default ChatInput;
