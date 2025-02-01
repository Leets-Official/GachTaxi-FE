declare module '@gachTaxi-types' {
  interface MatchStartPayload {
    startLocationName: string;
    endLocationName: string;
  }

  interface FriendRequestPayload {
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    senderId: number;
  }

  type Notification =
    | {
        notificationId: string;
        receiverId: number;
        type: 'MATCH_START';
        content: string;
        payload: MatchStartPayload;
        createdAt: string;
      }
    | {
        notificationId: string;
        receiverId: number;
        type: 'FRIEND_REQUEST';
        content: string;
        payload: FriendRequestPayload;
        createdAt: string;
      };

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

  interface UnreadNotificationTypes {
    code: number;
    message: string;
    data: {
      unreadCount: number;
      hasUnreadNotifications: boolean;
    };
  }
}
