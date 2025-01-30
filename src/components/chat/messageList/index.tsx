import ExitMessage from '../ExitMessage';
import InviteMessage from '../InviteMessage';
import NewMessage from '../NewMessage';
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
  console.log('messageList');

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

  const newMessageIndex = messages.chattingMessage.findIndex(
    (msg) =>
      new Date(msg.timeStamp) > new Date(messages.disconnectedAt) &&
      msg.senderId !== messages.memberId,
  );

  return (
    <div className="h-[calc(100dvh-162px)] scroll-hidden flex-1 overflow-y-auto px-4 flex flex-col-reverse">
      <div ref={bottomRef}></div>
      {messages.chattingMessage.map((msg, index) => (
        <div key={`${msg.timeStamp}-${index}`}>
          {index === newMessageIndex && <NewMessage />}
          <div
            className={`flex ${
              msg.senderId === messages.memberId
                ? 'justify-end'
                : 'justify-start'
            } mb-4`}
          >
            {msg.messageType === 'ENTER' ? (
              <InviteMessage invitedUsers={[msg.senderName]} />
            ) : msg.messageType === 'EXIT' ? (
              <ExitMessage invitedUsers={[msg.senderName]} />
            ) : msg.senderId === messages.memberId ? (
              <RenderMyMessage
                message={msg.message}
                timeStamp={msg.timeStamp}
              />
            ) : (
              <RenderOtherMessage
                senderName={msg.senderName}
                message={msg.message}
                timeStamp={msg.timeStamp}
                profilePicture={msg.profilePicture}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
