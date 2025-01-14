import { Link } from 'react-router-dom';
import BackIcon from '@/assets/icon/backIcon.svg?react';
import { BUTTON_DATA } from '@/constants';

const MyPageButton = () => {
  return (
    <div className="w-[98%] flex flex-col gap-[25px] pb-[30px]">
      {BUTTON_DATA.map((item, index) => (
        <div key={index} className="flex justify-between">
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="flex justify-between items-center w-full text-captionHeader"
            >
              <span>{item.label}</span>
              <BackIcon className="rotate-180" />
            </button>
          ) : (
            <Link
              to={item.path}
              className="flex justify-between items-center w-full text-captionHeader"
            >
              <span>{item.label}</span>
              {item.label === '전화번호 인증' ? (
                <span
                  className={`text-assistive h-[26px] p-4 rounded-full flex items-center justify-center ${
                    item.isVerified
                      ? 'bg-primary text-addRed'
                      : 'bg-addRed text-white'
                  }`}
                >
                  인증확인
                </span>
              ) : (
                <BackIcon className="rotate-180" />
              )}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyPageButton;
