import ChatRoom from './ChatRoom';

const ChatPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const senderName = '김지원';
  const roomId = '1';

  if (!accessToken) {
    return <div>Access token is missing. Please log in again.</div>;
  }

  return (
    <div>
      <h1>Chat</h1>
      <ChatRoom
        accessToken={accessToken}
        senderName={senderName}
        roomId={roomId}
      />
    </div>
  );
};

export default ChatPage;
