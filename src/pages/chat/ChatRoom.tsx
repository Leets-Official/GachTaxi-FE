import { useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { connectToWebSocket } from '@/libs/apis/chat/connectWebSocket.api';
import { subscribeToChatRoom } from '@/libs/apis/chat/chatSubscription.api';

const ChatRoom = ({
  accessToken,
  senderName,
  roomId,
}: {
  accessToken: string;
  senderName: string;
  roomId: string;
}) => {
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    // WebSocket 연결
    const stompClient = connectToWebSocket(accessToken, senderName);
    stompClientRef.current = stompClient;

    // 채팅방 구독
    const handleMessageReceived = (message: unknown) => {
      console.log('Message received in chat room:', message);
    };

    if (stompClient) {
      subscribeToChatRoom(stompClient, roomId, handleMessageReceived);
    }

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log('WebSocket disconnected');
      }
    };
  }, [accessToken, senderName, roomId]);

  return <div>채팅방 {roomId}에 연결 중...</div>;
};

export default ChatRoom;
