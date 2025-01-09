import { useNavigate } from 'react-router-dom';
import Button from '../commons/Button';
import BackIcon from '@/assets/icon/backIcon.svg?react';
import { useState } from 'react';

const MyPageButton = () => {
  const nav = useNavigate();

  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    // 인증 확인 API 로직
    setIsVerified((prev) => !prev);
  };

  const buttonData = [
    { label: '공지 사항', path: '/mypage/notice' },
    { label: '문의 사항', path: '/mypage/inquiry' },
    { label: '이용 기록', path: '/mypage/useage' },
    { label: '알림 설정', path: '/mypage/notification' },
  ];

  return (
    <div className="w-[98%] flex flex-col gap-[25px] text-captionHeader font-bold pb-[30px]">
      {buttonData.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span>{item.label}</span>
          <Button variant="icon" onClick={() => nav(item.path)}>
            <BackIcon className="rotate-180" />
          </Button>
        </div>
      ))}
      <div className="flex justify-between ">
        <span>전화번호 인증</span>
        <Button
          className={`w-[77px] h-[26px] text-assistive ${
            isVerified ? 'bg-primary text-addRed' : 'bg-addRed text-white'
          }`}
          onClick={handleVerification}
        >
          인증확인
        </Button>
      </div>
    </div>
  );
};

export default MyPageButton;
