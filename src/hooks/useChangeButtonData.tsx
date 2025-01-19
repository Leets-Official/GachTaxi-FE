import LogOutButton from '@/components/my-page/LogOutButton';
import BackIcon from '@/assets/icon/backIcon.svg?react';
import { Link } from 'react-router-dom';

interface ButtonItem {
  label: string;
  path?: string;
  component?: JSX.Element;
  isVerified?: boolean;
}

export const useChangeButtonData = (): JSX.Element[] => {
  const BUTTON_DATA: ButtonItem[] = [
    { label: '공지 사항', path: '/mypage/notice' },
    { label: '문의 사항', path: '/mypage/inquiry' },
    { label: '이용 기록', path: '/mypage/useage' },
    { label: '알림 설정', path: '/mypage/notification' },
    {
      label: '로그아웃',
      component: <LogOutButton />,
    },
    {
      label: '전화번호 인증',
      path: '/mypage/phone-verification',
      isVerified: false,
    },
  ];

  return BUTTON_DATA.map((item, index) => {
    if (item.component) {
      return <div key={index}>{item.component}</div>;
    }

    if (item.isVerified !== undefined) {
      return (
        <Link
          key={index}
          to={item.path!}
          className="flex justify-between items-center w-full text-captionHeader"
        >
          <span>{item.label}</span>
          <span
            className={`text-assistive h-[26px] p-4 rounded-full flex items-center justify-center ${
              item.isVerified
                ? 'bg-primary text-addRed'
                : 'bg-addRed text-white'
            }`}
          >
            인증확인
          </span>
        </Link>
      );
    }

    return (
      <Link
        key={index}
        to={item.path!}
        className="flex justify-between items-center w-full text-captionHeader"
      >
        <span>{item.label}</span>
        <BackIcon className="rotate-180" />
      </Link>
    );
  });
};
