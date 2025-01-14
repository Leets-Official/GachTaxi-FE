import { Client } from '@stomp/stompjs';
import SockJs from 'sockjs-client';

export const connectToWebSocket = (
  accessToken: string,
  senderName: string,
): Client => {
  const socketUrl = `${import.meta.env.VITE_API_BASE_URL}/ws`;
  console.log('socketUrl: ', socketUrl);

  let socket;
  try {
    socket = new SockJs(socketUrl);
    console.log('SockJS socket created:', socket);
  } catch (error) {
    console.error('Error creating SockJS socket:', error);
    throw error;
  }

  const stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log('[STOMP Debug]:', str),
    reconnectDelay: 5000,
    onConnect: (frame) => {
      console.log('WebSocket connected:', frame);
    },
    onStompError: (frame) => {
      console.error('STOMP error:', frame);
    },
    onWebSocketError: (error) => {
      console.error('WebSocket error:', error);
    },
  });

  stompClient.connectHeaders = {
    Authorization: `Bearer ${accessToken}`,
    senderName: senderName,
  };

  stompClient.activate();

  return stompClient;
};
