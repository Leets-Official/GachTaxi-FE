import { CompatClient, Stomp } from '@stomp/stompjs';
import { useState, useEffect, useRef } from 'react';
import { getChatMessages } from './getChatMessages';
//import SockJS from 'sockjs-client';

const useWebSocket = (roomId: number | null) => {
  const [stompClient, setstompClient] = useState<CompatClient | null>(null);
  const accessToken = import.meta.env.VITE_MASTER_TOKEN;
  const subscribed = useRef(false);

  useEffect(() => {
    const isMounted = true;

    const connectWebSocket = () => {
      if (stompClient || subscribed.current) return;
      //const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws`);
      // const socket = new SockJs(
      //   `https://e590-2406-5900-102a-70c2-6568-cdf4-9ae9-b838.ngrok-free.app/wss`,
      // );

      const ws = new WebSocket(
        `https://6140-2406-5900-102a-70c2-6568-cdf4-9ae9-b838.ngrok-free.app/ws`,
      );
      console.log('ws', ws);

      ws.onopen = () => {
        console.log('WebSocket 연결 성공');
        ws.send(JSON.stringify({ type: 'SUBSCRIBE', roomId }));
      };

      //console.log('socket', socket);
      const client = Stomp.over(ws);
      console.log('client', client);
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
          if (!subscribed.current && isMounted) {
            console.log('웹소켓 연결 성공!', client);
            client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
              console.log('새로운 메시지:', JSON.parse(message.body));
            });

            getChatMessages(roomId)
              .then((data) => {
                console.log('채팅 메시지:', data);
                // API로 받은 메시지 데이터를 상태 업데이트하거나 렌더링에 사용하세요.
              })
              .catch((error) => {
                console.error('채팅 메시지 조회 중 오류:', error);
              });
            subscribed.current = true;
            client.subscribe(`/user/queue/errors`, (message) => {
              console.log('새로운 메시지:', JSON.parse(message.body));
            });
          }
        },
        (error: undefined) => {
          console.error('웹소켓 연결 에러:', error);
          throw error;
        },
      );
      if (isMounted) setstompClient(client);
    };

    if (roomId && !stompClient && !subscribed.current) {
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        setstompClient(null);
        subscribed.current = false;
      }
    };
  }, []);

  const sendMessage = async (message: ChatMessageFromClient) => {
    if (stompClient?.connected && message) {
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify(message));
    }
  };
  return { sendMessage };
};
export default useWebSocket;
