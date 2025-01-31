import { CompatClient, Stomp } from '@stomp/stompjs';
import { useState, useEffect, useRef } from 'react';
import { getChatMessages } from '@/libs/apis/getChatMessages';

const useWebSocket = (roomId: number | null) => {
  const stompClientRef = useRef<CompatClient | null>(null);
  const [messages, setMessages] = useState<ChatMessagesFromServerFull | null>(
    null,
  );
  const accessToken = localStorage.getItem('accessToken');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(`${baseUrl}/ws`);
      console.log('WebSocket 연결 시도...');

      const client = Stomp.over(ws);
      stompClientRef.current = client;

      client.configure({
        reconnectDelay: 5000,
      });

      client.connect(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        () => {
          console.log('STOMP 클라이언트 연결 성공');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          client.subscribe(`/sub/chat/room/${roomId}`, (message: any) => {
            console.log('새로운 메시지 수신:', JSON.parse(message.body));
            getChatMessages(roomId).then((data) => {
              if (
                data.chattingMessage[data.chattingMessage.length - 1]
                  .messageId !==
                messages?.chattingMessage[messages.chattingMessage.length - 1]
                  .messageId
              ) {
                console.log('setMessages', data);
                setMessages(data);
              }
            });
          });
          getChatMessages(roomId).then((data) => {
            setMessages(data);
          });
        },
        (error: undefined) => {
          console.error('WebSocket 연결 실패:', error);
        },
      );
    };

    if (roomId && !stompClientRef.current) {
      connectWebSocket();
    }
  }, [roomId, accessToken, baseUrl, messages]);

  const handleDisconnect = async () => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect();
      console.log('WebSocket 연결 해제');
      stompClientRef.current = null;
    }
  };

  const sendMessage = async (sendMessage: ChatMessageFromClient) => {
    if (stompClientRef.current?.connected) {
      stompClientRef.current.send(
        `/pub/chat/message`,
        {},
        JSON.stringify(sendMessage),
      );
      console.log('메시지 전송:', sendMessage);
    }
  };

  return {
    sendMessage,
    messages,
    handleDisconnect,
  };
};

export default useWebSocket;
