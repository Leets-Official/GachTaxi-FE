import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { userInfoVerificationSchema } from '../../libs/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../commons/Input';
import Button from '../commons/Button';
import { UserInfoVerificationTypes } from 'gachTaxi-types';
import BasicProfileIcon from '../../assets/icon/basicProfileIcon.svg?react';
import CameraIcon from '../../assets/icon/cameraIcon.svg?react';
import { useEffect, useState } from 'react';

const UserInfoVerification = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const userInfoForm = useForm<z.infer<typeof userInfoVerificationSchema>>({
    resolver: zodResolver(userInfoVerificationSchema),
    defaultValues: {
      profileImage: undefined,
      nickName: '',
      realName: '',
      studentId: '',
      gender: 'male',
    },
    mode: 'onBlur',
  });

  const gender = userInfoForm.watch('gender');
  const currentImage = userInfoForm.watch('profileImage');

  const handleSubmitToUserInfo: SubmitHandler<UserInfoVerificationTypes> = (
    data,
  ) => {
    console.log(data);
  };

  useEffect(() => {
    if (!currentImage || typeof currentImage === 'string') return;
    setImagePreview(URL.createObjectURL(currentImage));
  }, [currentImage]);

  return (
    <form
      onSubmit={userInfoForm.handleSubmit(
        handleSubmitToUserInfo as SubmitHandler<
          z.infer<typeof userInfoVerificationSchema>
        >,
      )}
      className="flex flex-col w-full gap-[24px]"
    >
      <Controller
        control={userInfoForm.control}
        name="profileImage"
        render={({ field: { onChange, ...field } }) => (
          <>
            <div className="flex items-center justify-center my-6">
              <label
                htmlFor="profileImage"
                className="flex items-center gap-[10px] cursor-pointer relative rounded-full bg-[#D9D9D9]"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="프로필 이미지"
                    className="w-[104px] h-[104px] rounded-full object-cover"
                  />
                ) : (
                  <BasicProfileIcon />
                )}
                <div className="absolute bottom-0 right-0">
                  <CameraIcon />
                </div>
              </label>
              <input
                {...field}
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                  }
                }}
                value={undefined}
              />
            </div>
            {userInfoForm.formState.errors.profileImage && (
              <p className="text-red-500 mt-3">
                {userInfoForm.formState.errors.profileImage.message}
              </p>
            )}
          </>
        )}
      />
      <Input
        control={userInfoForm.control}
        name="nickName"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해주세요"
      />
      <Input
        control={userInfoForm.control}
        name="realName"
        label="본명"
        type="text"
        placeholder="본명을 입력해주세요"
      />
      <Input
        control={userInfoForm.control}
        name="studentId"
        label="학번"
        type="text"
        placeholder="ex) 20243333"
      />
      <label
        className="text-[14px] font-medium text-white mb-[-10px]"
        htmlFor="#"
      >
        성별
      </label>
      <div className="flex items-center w-full h-[50px] border border-[#787272] rounded-[10px] overflow-hidden">
        <div
          className={`flex-1 h-full cursor-pointer ${
            gender === 'male' ? 'bg-primary' : 'text-[#787272]'
          }`}
        >
          <Input
            control={userInfoForm.control}
            name="gender"
            type="radio"
            value="male"
            label="남"
            labelClassName="text-[16px] w-full h-full flex items-center justify-center cursor-pointer"
            className="hidden"
          />
        </div>
        <div
          className={`flex-1 h-full cursor-pointer ${
            gender === 'female' ? 'bg-primary' : 'text-[#787272]'
          }`}
        >
          <Input
            control={userInfoForm.control}
            name="gender"
            type="radio"
            value="female"
            label="여"
            labelClassName="text-[16px] w-full h-full flex items-center justify-center cursor-pointer"
            className="hidden"
          />
        </div>
      </div>
      <p className="text-[10px] text-[#787272] my-6 font-medium">
        * 프로필 정보는 회원 식별, 서비스 이용의 목적으로만 활용되며, <br />{' '}
        개인정보 수집 약관내용에 따라 보관됩니다.
      </p>
      <Button variant="primary" type="submit">
        시작하기
      </Button>
    </form>
  );
};

export default UserInfoVerification;
