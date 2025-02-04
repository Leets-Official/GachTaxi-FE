import BackIcon from '@/assets/icon/backIcon.svg?react';
import { Link } from 'react-router-dom';
import { useModal } from '@/contexts/ModalContext';
import MyPageModal from '@/components/modal/MyPageModal';
import AccountNumberModal from '@/components/modal/AccountNumberModal';

interface ButtonItem {
  label: string;
  path?: string;
  component?: JSX.Element;
  isVerified?: boolean;
}

export const useChangeButtonData = (): JSX.Element[] => {
  const { openModal } = useModal();

  const BUTTON_DATA: ButtonItem[] = [
    { label: '공지 사항', path: '/mypage/notice' },
    { label: '문의 사항', path: '/mypage/inquiry' },
    { label: '이용 기록', path: '/mypage/useage' },
    {
      label: '계좌 번호',
      component: (
        <div
          key="accountNumber"
          onClick={() => openModal(<AccountNumberModal />)}
          className="flex justify-between items-center w-full text-captionHeader cursor-pointer"
        >
          <span>계좌번호</span>
          <BackIcon className="rotate-180" />
        </div>
      ),
    },
    {
      label: '로그아웃 및 탈퇴',
      component: (
        <div
          key="logout"
          onClick={() => openModal(<MyPageModal />)}
          className="flex justify-between items-center w-full text-captionHeader cursor-pointer"
        >
          <span>로그아웃 및 탈퇴</span>
          <BackIcon className="rotate-180" />
        </div>
      ),
    },
  ];

  return BUTTON_DATA.map((item, index) => {
    if (item.component) {
      return <div key={index}>{item.component}</div>;
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
