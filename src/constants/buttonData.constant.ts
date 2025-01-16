export const BUTTON_DATA = [
  { label: '공지 사항', path: '/mypage/notice' },
  { label: '문의 사항', path: '/mypage/inquiry' },
  { label: '이용 기록', path: '/mypage/useage' },
  { label: '알림 설정', path: '/mypage/notification' },
  {
    label: '전화번호 인증',
    path: 'mypage/phone/verification',
    isVerified: false,
  },
] as const;
