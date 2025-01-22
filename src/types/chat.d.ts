interface ChatMessageFromClient {
  message: string;
}

interface ChatMessageFromServer {
  messageId: string;
  senderId: number;
  senderName: string;
  message: string;
  range: string;
  unreadCount: number;
  timeStamp: string;
  messageType: string;
  imageUrl: string;
}

interface Pageable {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface ChatMessageFromServerFull {
  chatList: ChatMessageFromServer[];
  pageable: Pageable;
  user: SimpleUser;
}
