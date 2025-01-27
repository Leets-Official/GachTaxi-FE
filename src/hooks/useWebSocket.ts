import { CompatClient, Stomp } from '@stomp/stompjs';
import { useState, useEffect } from 'react';
import { getChatMessages } from '@/libs/apis/getChatMessages';

const useWebSocket = (roomId: number | null) => {
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState<ChatMessagesFromServerFull | null>(
    null,
  );

  const accessToken = import.meta.env.VITE_MASTER_TOKEN;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(`${baseUrl}/ws`);
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
      }
    };
  }, [roomId, accessToken, baseUrl, stompClient]);

  const sendMessage = async (sendMessage: ChatMessageFromClient) => {
    if (stompClient?.connected && sendMessage) {
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify(sendMessage));
      console.log('메시지 전송:', sendMessage);
    }
    try {
      const updatedMessages = await getChatMessages(roomId);
      setMessages(updatedMessages);
      console.log('메시지 전송 후 최신 메시지:', updatedMessages);
    } catch (error) {
      console.error('메시지 전송 후 갱신 실패:', error);
    }
  };

  return {
    sendMessage,
    isSubscribed,
    messages,
  };
};

export default useWebSocket;
