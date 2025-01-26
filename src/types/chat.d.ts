interface ChatMessageFromClient {
  content: string;
}

interface SubscribeServer {
  message: string | null;
  messageId: string | null;
  messageType: MessageType;
  range?: ReadReceiptRange | null;
  roomId: number;
  senderId: number;
  senderName: string;
  timeStamp: string;
  unreadCount: number | null;
  imageUrl?: string;
}

interface ChattingList {
  messageId: string | null;
  senderId: number;
  senderName: string;
  message: string | null;
  unreadCount: number | null;
  timeStamp: string;
  messageType: MessageType;
  imageUrl?: string;
  roomId: number;
  range?: ReadReceiptRange | null;
}

interface ChatMessagesFromServerFull {
  chattingMessage: ChattingList[];
  memberId: number;
  disconnectedAt: string;
  pageable: Pageable;
}

type MessageType = 'ENTER' | 'MESSAGE' | 'EXIT' | 'READ';

interface Pageable {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

interface ReadReceiptRange {
  startMessageId: string;
  endMessageId: string;
}
