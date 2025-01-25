import InviteMessage from '../InviteMessage';
import RenderMyMessage from './renderMyMessage';
import RenderOtherMessage from './renderOtherMessage';

interface MessageListProps {
  messages: ChatMessagesFromServerFull | null;
}

const MessageList = ({ messages }: MessageListProps) => {
  if (!messages) {
    return (
      <div className="text-center text-gray-400">메시지를 불러오는 중...</div>
    );
  }
  console.log('MessgeList:', messages);

  return (
    <div
      //ref={listRef}
      //onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 bg-[#141513]"
    >
      {messages?.chattingMessage.map((msg, index) =>
        msg.messageType === 'ENTER' ? (
          <InviteMessage
            key={`${msg.timeStamp}-${index}`}
            invitedUsers={[msg.senderName]}
          />
        ) : msg.messageType === 'MESSAGE' ? (
          <div
            key={`${msg.timeStamp}-${index}`}
            className={`flex ${msg.senderId === messages.memberId ? 'justify-end' : 'justify-start'} mb-4`}
          >
            {msg.senderId === messages.memberId ? (
              <RenderMyMessage
                message={msg.message}
                timeStamp={msg.timeStamp}
              />
            ) : (
              <RenderOtherMessage
                senderName={msg.senderName}
                message={msg.message}
                timeStamp={msg.timeStamp}
                imageUrl={msg.imageUrl}
              />
            )}
          </div>
        ) : (
          //읽음처리구현할에정인데 아직 구현 전이라 일단 초대메시지로 대체해두었음
          <InviteMessage
            key={`${msg.timeStamp}-${index}`}
            invitedUsers={[msg.senderName]}
          />
        ),
      )}
    </div>
  );
};

export default MessageList;
