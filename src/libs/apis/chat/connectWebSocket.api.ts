import { CompatClient, Stomp } from '@stomp/stompjs';
import { useState, useEffect } from 'react';
import SockJs from 'sockjs-client';

const useWebSocket = (roomId: number) => {
  const [stompClient, setstompClient] = useState<CompatClient | null>(null);
  const accessToken = import.meta.env.VITE_MASTER_TOKEN;

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJs(`${import.meta.env.VITE_API_BASE_URL}/ws`);
      console.log('socket', socket);
      const client = Stomp.over(socket);
      console.log('client', client);
      client.configure({
        reconnectDelay: 5000,
      });
      client.connect(
        { Authorization: `Bearer ${accessToken}` },
        () => {
          client.subscribe(`/sub/chat/room/${roomId}`, () => {
            //const receivedMessage = res.data;
          });
        },
        (error: undefined) => {
          console.log('웹소켓 연결 에러....');
          console.error('웹소켓 연결 에러:', error);
          throw error;
        },
      );
      setstompClient(client);
    };
    if (roomId && !stompClient) {
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        setstompClient(null);
      }
    };
  }, [roomId, stompClient]);
};
export default useWebSocket;
