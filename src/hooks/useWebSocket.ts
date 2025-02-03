import { CompatClient, Stomp } from '@stomp/stompjs';
import { useState, useEffect, useRef } from 'react';
import { getChatMessages } from '@/libs/apis/getChatMessages';
import { getChatNumber } from '@/libs/apis/getChatNumber.api';

const useWebSocket = (roomId: number | null) => {
  const stompClientRef = useRef<CompatClient | null>(null);
  const [messages, setMessages] = useState<ChatMessagesFromServerFull | null>(
    null,
  );
  const [participantCount, setParticipantCount] = useState<number>(0);
  const accessToken = localStorage.getItem('accessToken');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!roomId) return;

    const fetchChatNumber = async () => {
      try {
        const count = await getChatNumber(roomId);
        setParticipantCount(count);
        console.log(`채팅방 인원 수 업데이트: ${count}`);
      } catch (error) {
        console.error('채팅방 인원 수 가져오기 실패:', error);
      }
    };
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
          client.subscribe(`/sub/chat/room/${roomId}`, async (message: any) => {
            console.log('새로운 메시지 수신:', JSON.parse(message.body));
            const parsedMessage = JSON.parse(message.body);
            const messageType = parsedMessage.messageType;
            const chatData = await getChatMessages(roomId);
            if (
              chatData.chattingMessage[chatData.chattingMessage.length - 1]
                .messageId !==
              messages?.chattingMessage[messages.chattingMessage.length - 1]
                .messageId
            ) {
              console.log('setMessages', chatData);
              setMessages(chatData);
            }
            if (messageType === 'ENTER' || messageType === 'EXIT') {
              fetchChatNumber();
            }
          });
          getChatMessages(roomId).then((data) => {
            setMessages(data);
          });
          fetchChatNumber();
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
    participantCount,
  };
};

export default useWebSocket;
