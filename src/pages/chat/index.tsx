import ChatInput from '@/components/chat/MessageInput';
import MessageList from '@/components/chat/messageList/index';
import BackButton from '@/components/commons/BackButton';
import useWebSocket from '@/hooks/useWebSocket';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);

  const { messages, sendMessage, participantCount } = useWebSocket(roomId);

  return (
    <section className="relative flex-1 w-full flex flex-col h-full max-h-1vh">
      <div className="sticky top-0 left-0 p-horizontal bg-darkBlack">
        <BackButton />
        <div className="flex h-[48px] items-center">
          <h1 className="font-bold text-header">채팅방</h1>
          <span className="text-captionHeader text-textDarkGray mt-[4px] ml-[3%]">
            {participantCount}
          </span>
        </div>
      </div>
      <div className="overflow-y-auto h-fit">
        {messages ? (
          <>
            <div className="h-full">
              <MessageList messages={messages} />
            </div>
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
