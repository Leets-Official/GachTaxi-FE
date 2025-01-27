import { useState } from 'react';
import BottomMenu from './bottomMenu';
import ChatPlus from '@/assets/icon/chatPlus.svg?react';
import ChatX from '@/assets/icon/chatX.svg?react';
import ChatSend from '@/assets/icon/chatSend.svg?react';

interface ChatMessage {
  roomId: number;
  sendMessage: (message: { message: string }) => void;
}

const ChatInput = ({ roomId, sendMessage }: ChatMessage) => {
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState('');

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleAccountSend = (accountInfo: string) => {
    setMessage(accountInfo);
  };

  console.log('ChatInputMessages', roomId);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    sendMessage({ message });

    setMessage('');
  };

  return (
    <section className="flex-1 w-full flex flex-col">
      {showMenu && (
        <div className="w-full h-[144px] bg-secondary">
          <BottomMenu onSendAccount={handleAccountSend} roomId={roomId} />
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 text-white bg-[#465443] rounded-full px-4 py-2 outline-none placeholder-black mx-4"
        />

        <button
          className="flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <ChatSend />
        </button>
      </div>
    </section>
  );
};

export default ChatInput;
