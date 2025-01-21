import RouteSettingIcon from '@/assets/icon/smallRouteChangeIcon.svg?react';
import LinkIcon from '@/assets/icon/agreeLinkIcon.svg?react';
import { Link } from 'react-router-dom';

const MatchingNotification = () => {
  return (
    <div className="min-h-[144px] bg-secondary rounded-box p-vertical flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between w-full">
        <p className="font-bold text-captionHeader">곧 매칭 시간이에요</p>
        <span className="font-medium text-body">오전 09:50</span>
      </div>

      <div className="flex items-center gap-3">
        <RouteSettingIcon />
        <div className="relative top-[-2px]">
          <p className="font-medium text-captionHeader">가천대 정문</p>
          <p className="font-medium text-captionHeader">가천대 AI 공학관</p>
        </div>
      </div>

      <div className="w-full flex justify-end items-center">
        <Link
          to=""
          className="underline font-medium text-captionHeader flex gap-2 items-center"
        >
          자세히보기
          <LinkIcon />
        </Link>
      </div>
    </div>
  );
};

export default MatchingNotification;
