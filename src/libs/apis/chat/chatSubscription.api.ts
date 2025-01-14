import { Client } from '@stomp/stompjs';

export const subscribeToChatRoom = (
  stompClient: Client,
  roomId: string,
  onMessageReceived: (message: unknown) => void,
) => {
  if (!stompClient.connected) {
    console.error('STOMP client is not connected. Cannot subscribe to room.');
    return;
  }

  // 채팅방 구독
  try {
    const subscription = stompClient.subscribe(
      `/sub/chat/room/${roomId}`,
      (message) => {
        try {
          const parsedMessage = JSON.parse(message.body);
          onMessageReceived(parsedMessage);
        } catch (error) {
          console.error('Error parsing received message:', error);
        }
      },
    );
    console.log(`Subscribed to chat room: ${roomId}`);
    return subscription;
  } catch (error) {
    console.error(`Error subscribing to chat room ${roomId}:`, error);
  }
};
