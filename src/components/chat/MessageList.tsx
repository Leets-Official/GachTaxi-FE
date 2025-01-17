import { useState, useRef } from 'react';
import InviteMessage from './InviteMessage';
// import {
//   fetchChatMessages,
//   Message,
//   Pageable,
// } from '@/libs/apis/chat/MessageList.api';

// interface MessageListProps {
//   roomId: string;
//   subscribeToRoom: (roomId: string) => Promise<void>;
// }

const mockMessages = [
  {
    senderName: '사용자1',
    message: '반가워요 사용자1님!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    timeStamp: '2025-01-13T21:29:57.87',
    messageType: 'MESSAGE',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
  },
  {
    senderName: '나',
    message: '정문 어떠세요!ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ',
    timeStamp: '2025-01-13T21:22:29.21',
    messageType: 'MESSAGE',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
  },
  {
    senderName: '사용자2',
    message: '반가워요 지원님!',
    timeStamp: '2025-01-13T21:21:28.964',
    messageType: 'MESSAGE',
    imageUrl:
      'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp',
  },
  {
    senderName: '나',
    message: '반가워요!ㅇㅇㅇㅇ',
    timeStamp: '2025-01-13T21:20:52.71',
    messageType: 'MESSAGE',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
  },
  {
    senderName: '다른사람1',
    message: '다른사람1 님이 입장하셨습니다.',
    timeStamp: '2025-01-13T21:20:10.06',
    messageType: 'ENTER',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
  },
];

const MessageList = () => {
  const [messages, setMessages] = useState(mockMessages);
  //   const [pageable, setPageable] = useState<Pageable | null>(null);
  //   const [lastMessageTimeStamp, setLastMessageTimeStamp] = useState<
  //     string | null
  //   >(null);
  //   const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  //const pageSize = 10;

  // 채팅방 구독 및 초기 메시지 로드
  //   useEffect(() => {
  //     const initialize = async () => {
  //       try {
  //         await subscribeToRoom(roomId);
  //         fetchMessages(0, null);
  //       } catch (error) {
  //         console.error('Failed to subscribe to room:', error);
  //       }
  //     };

  //     initialize();
  //   }, [roomId, subscribeToRoom]);

  //   const fetchMessages = async (
  //     pageNumber: number,
  //     timeStamp: string | null,
  //   ) => {
  //     if (isLoading || (pageable?.last && pageNumber > pageable.pageNumber))
  //       return;

  //     setIsLoading(true);

  //     try {
  //       const data = await fetchChatMessages(
  //         roomId,
  //         pageNumber,
  //         pageSize,
  //         timeStamp || undefined,
  //       );

  //       const newMessages = data.chattingMessage.reverse();
  //       setMessages((prev) => [...newMessages, ...prev]);
  //       setPageable(data.pageable);

  //       if (pageNumber === 0 && newMessages.length > 0) {
  //         setLastMessageTimeStamp(newMessages[newMessages.length - 1].timeStamp);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch messages:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const loadMoreMessages = () => {
    const newMessages = [
      {
        senderName: '이강혁',
        message: '안녕하세요!',
        timeStamp: '2025-01-13T21:19:17.457',
        messageType: 'MESSAGE',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      },
      {
        senderName: '이강혁',
        message: '이강혁 님이 입장하셨습니다.',
        timeStamp: '2025-01-13T21:18:58.34',
        messageType: 'ENTER',
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
      className="flex-1 overflow-y-auto px-4"
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
            {msg.senderName.trim() === '나' ? (
              <>
                <p className="text-[10px] mt-1 mr-2 text-textDarkGray self-end">
                  {new Date(msg.timeStamp).toLocaleTimeString('ko-KR', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </p>
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-3xl bg-addGreen`}
                >
                  <p className="text-black text-body">{msg.message}</p>
                </div>
              </>
            ) : (
              <div className="flex items-start gap-2">
                <img
                  src={msg.imageUrl}
                  alt={`${msg.senderName}의 프로필`}
                  className="w-8 h-8 rounded-full object-cover border-textDarkGray"
                />
                <div className={`max-w-[70%]`}>
                  <p className="text-assistive text-white mb-1">
                    {msg.senderName}
                  </p>
                  <div
                    className={`max-w-[100%] px-4 py-2 rounded-3xl bg-[#465443] whitespace-normal`}
                  >
                    <p className="text-white text-body">{msg.message}</p>
                  </div>
                </div>
                <p className="text-[10px] mt-0.5 text-textDarkGray self-end">
                  {new Date(msg.timeStamp).toLocaleTimeString('ko-KR', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </p>
              </div>
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
