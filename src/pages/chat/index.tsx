import ChatInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/messageList/index';
import BackButton from '@/components/commons/BackButton';
import useWebSocket from '@/hooks/useWebSocket';

const ChatPage = () => {
  const chatMember = 3;
  const roomId = 1;

  const { isSubscribed, messages, sendMessage } = useWebSocket(roomId);

  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="sticky top-0 p-horizontal bg-darkBlack">
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
          </>
        ) : (
          <div className="text-center text-gray-400">
            메시지를 불러오는 중...
          </div>
        )}
      </div>
      <div className="sticky bottom-0">
        <ChatInput roomId={roomId} sendMessage={sendMessage} />
      </div>
    </section>
  );
};

export default ChatPage;
