import Profile from '@/assets/icon/myPageProfile.svg?react';
import ProfileModify from '@/assets/icon/myPageModifyButton.svg?react';

interface MyProfileHeaderProps {
  profileImageUrl?: string;
  nickname?: string;
}

const MyProfileHeader = ({
  profileImageUrl,
  nickname,
}: MyProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-[16px] border-b-2 border-textDarkGray pb-[30px]">
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="사용자 프로필"
          className="w-[70px] h-[70px] rounded-full object-cover"
        />
      ) : (
        <Profile className="w-[70px] h-[70px]" />
      )}
      <div>
        <p className="text-header flex">
          {nickname}
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
