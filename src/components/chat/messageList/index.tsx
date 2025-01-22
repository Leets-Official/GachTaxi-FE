import { useState, useRef, useEffect } from 'react';
import InviteMessage from '../InviteMessage';
import RenderMyMessage from './renderMyMessage';
import RenderOtherMessage from './renderOtherMessage';
import { getChatMessages } from '@/libs/apis/chat/getChatMessages';

const MessageList = ({ roomId }: { roomId: number }) => {
  const [messages, setMessages] = useState<ChatMessageFromServer[]>([]);
  //   const [pageable, setPageable] = useState<Pageable | null>(null);
  //   const [lastMessageTimeStamp, setLastMessageTimeStamp] = useState<
  //     string | null
  //   >(null);
  //   const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await getChatMessages(roomId);
        console.log('채팅 메시지:', data);
        if (Array.isArray(data.message)) {
          setMessages(data.message); // 배열일 경우 messages 상태에 저장
        } else {
          console.error('데이터 형식이 예상과 다릅니다.', data);
        }
      } catch (error) {
        console.error('채팅 메시지 조회 중 오류:', error);
      }
    };
    getMessages();
  }, []);

  const loadMoreMessages = () => {
    const newMessages: ChatMessageFromServer[] = [
      {
        messageId: '678db88cb20ab72494969cba',
        senderId: 2, // 다른 사람이 보낸 메시지
        senderName: '사용자1',
        message: '안녕하세요!',
        range: '324dffsdf',
        unreadCount: 1,
        timeStamp: '2025-01-21T10:09:25.71',
        messageType: 'MESSAGE',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      },
      {
        messageId: '678db88cb20ab72494969cba',
        senderId: 2, // 다른 사람이 보낸 메시지
        senderName: '사용자1',
        message: '안녕하세요!',
        range: '324dffsdf',
        unreadCount: 1,
        timeStamp: '2025-01-21T10:09:25.71',
        messageType: 'MESSAGE',

        imageUrl:
          'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      },
    ];
    setMessages((prev) => [...newMessages, ...prev]);
  };

  const handleScroll = () => {
    // if (!listRef.current || isLoading || pageable?.last) return;

    // if (listRef.current.scrollTop === 0) {
    //   fetchMessages((pageable?.pageNumber || 0) + 1, lastMessageTimeStamp); // 다음 페이지 요청
    // }
    if (!listRef.current) return;

    if (listRef.current.scrollTop === 0) {
      loadMoreMessages();
    }
  };

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 bg-[#141513]"
      style={{ height: '100%' }}
    >
      {messages.map((msg, index) =>
        msg.messageType === 'MESSAGE' ? (
          <div
            key={`${msg.timeStamp}-${index}`}
            className={`flex ${
              msg.senderName.trim() === '나' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            {msg.senderId === 1 ? (
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
