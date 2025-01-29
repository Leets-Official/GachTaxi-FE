declare module '@gachTaxi-types' {
  interface Notification {
    notificationId: number;
    senderId: number;
    receiverId: number;
    type: 'MATCH_START' | 'MATCH_FINISH' | 'FRIEND_REQUEST';
    title: string;
    content: string;
    createdAt: string;
  }

  interface Pageable {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    last: boolean;
  }

  interface NotificationResponse {
    code: number;
    message: string;
    data: {
      response: Notification[];
      pageable: Pageable;
    };
  }
}
