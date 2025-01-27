import InviteMessage from '../InviteMessage';
import RenderMyMessage from './renderMyMessage';
import RenderOtherMessage from './renderOtherMessage';
import { useEffect, useRef, useState } from 'react';

interface MessageListProps {
  messages: ChatMessagesFromServerFull | null;
}

const MessageList = ({ messages }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
      },
      {
        root: containerRef.current,
        threshold: 0.1,
      },
    );
    const currentBottomRef = bottomRef.current;

    if (currentBottomRef) {
      observer.observe(currentBottomRef);
    }
    return () => {
      if (currentBottomRef) {
        observer.unobserve(currentBottomRef);
      }
    };
  }, [messages]);

  useEffect(() => {
    if (isAtBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  if (!messages) {
    return (
      <div className="text-center text-gray-400">메시지를 불러오는 중...</div>
    );
  }
  console.log('MessgeList:', messages);

  return (
    <div className="flex-1 overflow-y-auto px-4 flex flex-col-reverse">
      <div ref={bottomRef}></div>
      {messages.chattingMessage.map((msg, index) =>
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
