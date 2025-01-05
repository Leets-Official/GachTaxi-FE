import UserInfoVerification from '../../components/sign/userInfoVerification';

const UserInfoPage = () => {
  return (
    <>
      <div className="flex flex-col gap-[16px] text-white mt-vertical">
        <h1 className="text-[20px] font-bold">
          사진과 이름을 <br /> 등록해주세요
        </h1>
        <p className="font-medium text-[16px]">
          본명과 학번은 공개되지 않아요.
        </p>
      </div>
      <UserInfoVerification />
    </>
  );
};

export default UserInfoPage;
