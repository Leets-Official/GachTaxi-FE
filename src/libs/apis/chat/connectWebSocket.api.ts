import { CompatClient, Stomp } from '@stomp/stompjs';
import { useState, useEffect, useRef } from 'react';
import { getChatMessages } from './getChatMessages';

const useWebSocket = (roomId: number | null) => {
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState<ChatMessagesFromServerFull | null>(
    null,
  );
  const subscribed = useRef(false);

  const accessToken = import.meta.env.VITE_MASTER_TOKEN;

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(`${import.meta.env.VITE_API_BASE_URL}/ws`);
      console.log('WebSocket 연결 시도...');

      const client = Stomp.over(ws);
      console.log('STOMP 클라이언트 생성됨');

      client.configure({
        reconnectDelay: 5000,
      });

      client.connect(
        {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          client.subscribe(`/sub/chat/room/${roomId}`, (message: any) => {
            console.log('구독이 성공적으로 설정되었습니다.');

            const receivedMessage: SubscribeServer = JSON.parse(message.body);
            console.log('구독 새로운 메시지 수신:', receivedMessage);

            switch (receivedMessage.messageType) {
              case 'ENTER':
                console.log(`${receivedMessage.senderName} 님이 입장했습니다.`);
                break;

              case 'MESSAGE':
                console.log(
                  `${receivedMessage.senderName} 구독 타입이 MESSAGE입니다.`,
                );
                break;

              case 'EXIT':
                console.log(`${receivedMessage.senderName} 님이 퇴장했습니다.`);
                break;

              case 'READ':
                console.log(`읽음 처리됨: ${receivedMessage.senderName}`);
                break;

              default:
                console.warn(
                  '알 수 없는 메시지 타입:',
                  receivedMessage.messageType,
                );
            }
          });
          setIsSubscribed(true);
          getChatMessages(roomId).then((data) => {
            console.log('서버에서 메시지 가져옴:', data);
            setMessages(data);
          });
        },
        (error: undefined) => {
          console.error('웹소켓 연결 실패:', error);
        },
      );
      setStompClient(client);
    };

    if (roomId && !stompClient) {
      console.log('roomId가 있지만 stompClient가 없습니다');
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        console.log('웹소켓 연결 해제');
        setStompClient(null);
        setIsSubscribed(false);
        subscribed.current = false;
      }
    };
  }, [roomId, stompClient, setIsSubscribed]);

  const sendMessage = async (sendMessage: ChatMessageFromClient) => {
    if (stompClient?.connected && sendMessage) {
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify(sendMessage));
      console.log('메시지 전송:', sendMessage);
    }
  };

  // 페이지네이션 로직 (채팅방 위로 스크롤할 때 추가 로드)
  const loadMoreMessages = async (
    lastMessageTimeStamp: string,
    pageSize: number,
  ) => {
    if (!roomId) return;

    try {
      const newMessages = await getChatMessages(
        roomId,
        lastMessageTimeStamp,
        1,
        pageSize + 1,
      );
      console.log('더 많은 메시지 로드됨:', newMessages);

      setMessages(newMessages);
    } catch (error) {
      console.error('추가 메시지 로딩 중 오류:', error);
    }
  };

  return {
    sendMessage,
    isSubscribed,
    messages,
    loadMoreMessages,
  };
};

export default useWebSocket;
