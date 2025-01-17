// import { useRef, useEffect } from 'react';
// import { Client } from '@stomp/stompjs';
// import useWebsocket from '@/libs/apis/chat/connectWebSocket.api';
// import { subscribeToChatRoom } from '@/libs/apis/chat/chatSubscription.api';

import useWebSocket from '@/libs/apis/chat/connectWebSocket.api';

const ChatRoom = ({ roomId }: { roomId: number }) => {
  const sendMessage = useWebSocket(roomId);

  console.log('sendMessage', sendMessage);

  return <div>채팅방 {roomId}에 연결 중...</div>;
};

export default ChatRoom;
