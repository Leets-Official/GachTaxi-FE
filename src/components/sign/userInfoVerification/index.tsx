import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { userInfoVerificationSchema } from '../../../libs/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../commons/Input';
import Button from '../../commons/Button';
import { UserInfoVerificationTypes } from 'gachTaxi-types';
import { useEffect, useState } from 'react';
import ProfileImageUpload from './ProfileImageUpload';
import GenderSelect from './GenderSelect';

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
    // API 호출
    console.log(data);
  };

  useEffect(() => {
    if (!currentImage || typeof currentImage === 'string') return;
    const objectUrl = URL.createObjectURL(currentImage);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
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
      <ProfileImageUpload
        control={userInfoForm.control}
        imagePreview={imagePreview}
      />
      {userInfoForm.formState.errors.profileImage && (
        <p className="text-red-500 mt-3">
          {userInfoForm.formState.errors.profileImage.message}
        </p>
      )}
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
      <GenderSelect control={userInfoForm.control} gender={gender} />
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
