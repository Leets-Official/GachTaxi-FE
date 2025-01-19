import ChatInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/messageList/index';
import NewMessage from '@/components/chat/NewMessage';
import BackButton from '@/components/commons/BackButton';

const ChatPage = () => {
  const chatMember = 3;

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      <div className="sticky top-0 bg-[#011A11]">
        <BackButton />
        <div className="flex h-[48px] items-center">
          <h1 className="font-bold text-header">채팅방</h1>
          <span className="text-captionHeader text-textDarkGray mt-[4px] ml-[3%]">
            {chatMember}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <MessageList />
        <div className="w-full flex items-center justify-center">
          <NewMessage />
        </div>
      </div>
      <div className="sticky">
        <ChatInput />
      </div>
    </section>
  );
};

export default ChatPage;
