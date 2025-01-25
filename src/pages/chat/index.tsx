import ChatInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/messageList/index';
import NewMessage from '@/components/chat/NewMessage';
import BackButton from '@/components/commons/BackButton';
import useWebSocket from '@/hooks/useWebSocket';

const ChatPage = () => {
  const chatMember = 3;
  const roomId = 1;

  const { isSubscribed, messages } = useWebSocket(roomId);

  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal bg-darkBlack">
      <div className="sticky top-0">
        <BackButton />
        <div className="flex h-[48px] items-center">
          <h1 className="font-bold text-header">채팅방</h1>
          <span className="text-captionHeader text-textDarkGray mt-[4px] ml-[3%]">
            {chatMember}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isSubscribed ? (
          <>
            <MessageList messages={messages} />
            <div className="w-full flex items-center justify-center">
              <NewMessage />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400">
            메시지를 불러오는 중...
          </div>
        )}
      </div>
      <div className="sticky">
        <ChatInput roomId={roomId} />
      </div>
    </section>
  );
};

export default ChatPage;
