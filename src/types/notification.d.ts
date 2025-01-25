declare module '@gachTaxi-types' {
  interface UnreadNotificationTypes {
    code: number;
    message: string;
    data: {
      unreadCount: number;
      hasUnreadNotifications: boolean;
    };
  }
}
