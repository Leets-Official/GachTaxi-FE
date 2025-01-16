import Profile from '@/assets/icon/myPageProfile.svg?react';
import ProfileModify from '@/assets/icon/myPageModifyButton.svg?react';

const MyProfileHeader = () => {
  return (
    <div className="flex items-center gap-[16px] border-b-2 border-textDarkGray pb-[30px]">
      <Profile />
      <div>
        <p className="text-header font-bold flex">
          닉네임
          <ProfileModify className="ml-[5px] mt-[5px]" />
        </p>
        <p className="text-captionBody text-textLightGray">추가 정보</p>
      </div>
    </div>
  );
};

export default MyProfileHeader;
