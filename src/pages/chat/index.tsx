import ChatRoom from './ChatRoom';

const ChatPage = () => {
  // const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);
  // const senderName = '김지원';
  const roomId = 1;

  // if (!accessToken) {
  //   return <div>Access token is missing. Please log in again.</div>;
  // }

  return (
    <div>
      <h1>Chat</h1>
      <ChatRoom roomId={roomId} />
    </div>
  );
};

export default ChatPage;
