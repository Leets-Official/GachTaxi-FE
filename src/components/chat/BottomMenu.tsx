import CallTaxi from '@/assets/icon/callTaxi.svg?react';
import SendAccount from '@/assets/icon/sendAccount.svg?react';
import CancelMatching from '@/assets/icon/cancelMatching.svg?react';
import CloseMatching from '@/assets/icon/closeMatching.svg?react';

const BottomMenu = () => {
  return (
    <div className="flex justify-around bg-secondary py-4">
      <div className="flex flex-col items-center">
        <CallTaxi />
        <p className="text-captionBody text-textLightGray mt-2">택시 호출</p>
      </div>
      <div className="flex flex-col items-center">
        <SendAccount />
        <p className="text-captionBody text-textLightGray mt-2">계좌 전송</p>
      </div>
      <div className="flex flex-col items-center">
        <CloseMatching />
        <p className="text-captionBody text-textLightGray mt-2">매칭 마감</p>
      </div>
      <div className="flex flex-col items-center">
        <CancelMatching />
        <p className="text-captionBody text-textLightGray mt-2">매칭 취소</p>
      </div>
    </div>
  );
};

export default BottomMenu;
