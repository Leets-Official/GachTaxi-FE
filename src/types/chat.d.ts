interface ChatMessageFromClient {
  message: string;
}

interface SubscribeServer {
  message: string | null;
  messageId: string | null;
  messageType: MessageType;
  range?: ReadReceiptRange | null;
  roomId?: number;
  senderId: number;
  senderName: string;
  timeStamp: string;
  unreadCount: number | null;
  profilePicture?: string;
}

interface ChattingList {
  messageId: string | null;
  senderId: number;
  senderName: string;
  message: string | null;
  unreadCount: number | null;
  timeStamp: string;
  messageType: MessageType;
  profilePicture?: string;
  roomId?: number;
  range?: ReadReceiptRange | null;
}

interface ChatMessagesFromServerFull {
  chattingMessage: ChattingList[];
  memberId: number;
  disconnectedAt: string;
  pageable: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    last: boolean;
    empty: boolean;
  };
}

type MessageType = 'ENTER' | 'MESSAGE' | 'EXIT' | 'READ';

interface ReadReceiptRange {
  startMessageId: string;
  endMessageId: string;
}
