export interface Message {
  senderName: string;
  message: string;
  timeStamp: string;
  messageType: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

interface FetchMessagesResponse {
  chattingMessage: Message[];
  pageable: Pageable;
  disconnectedAt: string;
}

export const fetchChatMessages = async (
  roomId: string,
  pageNumber: number,
  pageSize: number,
  lastMessageTimeStamp?: string,
): Promise<FetchMessagesResponse> => {
  const queryParams = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    ...(lastMessageTimeStamp && { lastMessageTimeStamp }),
  }).toString();

  const response = await fetch(`/api/chat/${roomId}/messages?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch messages: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.code !== 200) {
    throw new Error(`API Error: ${data.message}`);
  }

  return data.data;
};
