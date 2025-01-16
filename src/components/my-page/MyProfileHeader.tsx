import Profile from '@/assets/icon/myPageProfile.svg?react';
import ProfileModify from '@/assets/icon/myPageModifyButton.svg?react';

const MyProfileHeader = () => {
  return (
    <div className="flex items-center gap-[16px] border-b-2 border-textDarkGray pb-[30px]">
      <Profile />
      <div>
        <p className="text-header flex">
          닉네임
          <ProfileModify className="ml-[5px] mt-[10px]" />
        </p>
        <p className="text-captionBody text-textLightGray mt-[8px]">
          추가 정보
        </p>
      </div>
    </div>
  );
};

export default MyProfileHeader;
