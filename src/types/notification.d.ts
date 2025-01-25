declare module '@gachTaxi-types' {
  interface UnreadNotificationTypes {
    code: number;
    message: string;
    data: {
      unreadCount: number;
      hasUnreadNotifications: boolean;
    };
  }

  // NotificationResponse 종속
  type NotificationType =
    | 'CHAT'
    | 'MATCH_SUCCESS'
    | 'MATCH_FAILURE'
    | 'MATCH_FINISH'
    | 'FRIEND_REQUEST';

  // NotificationResponse 종속
  type NotificationStatus = 'UNREAD' | 'READ' | 'UNSENT';

  // NotificationResponse 종속
  interface Notification {
    notificationId: number;
    senderId: number;
    receiverId: number;
    type: NotificationType;
    status: NotificationStatus;
    title: string;
    content: string;
    createdAt: string;
  }

  // NotificationResponse 종속
  interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }

  // NotificationResponse 종속
  interface Pageable {
    offset: number;
    sort: Sort;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  }

  interface NotificationResponse {
    code: number;
    message: string;
    data: {
      size: number;
      content: Notification[];
      number: number;
      sort: Sort;
      first: boolean;
      pageable: Pageable;
      numberOfElements: number;
      last: boolean;
      empty: boolean;
    };
  }
}
