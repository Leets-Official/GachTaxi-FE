import { useState, useEffect } from 'react';
import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { z } from 'zod';
import { userInfoVerificationSchema } from '@/libs/schemas/auth';
import { UserInfoVerificationTypes } from 'gachTaxi-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import ProfileImageUpload from '@/components/sign/userInfoVerification/ProfileImageUpload';

const EditProfilePage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const profileForm = useForm<z.infer<typeof userInfoVerificationSchema>>({
    resolver: zodResolver(userInfoVerificationSchema),
    defaultValues: {
      nickName: '',
      realName: '',
      studentId: '',
      gender: 'MALE',
      profileImage: undefined,
    },
    mode: 'onSubmit',
  });

  const currentImage = profileForm.watch('profileImage');

  useEffect(() => {
    if (!currentImage || typeof currentImage === 'string') return;
    const objectUrl = URL.createObjectURL(currentImage);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [currentImage]);

  const handleSubmitChange: SubmitHandler<UserInfoVerificationTypes> = (
    data,
  ) => {
    try {
      console.log(data);
      profileForm.setValue('nickName', '');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="flex-1 w-full flex flex-col gap-[48px] p-horizontal max-h-screen">
      <BackButton />

      <h1 className="text-header font-bold">프로필 수정</h1>

      <form
        className="flex flex-col gap-2 w-full"
        onSubmit={profileForm.handleSubmit(
          handleSubmitChange as SubmitHandler<
            z.infer<typeof userInfoVerificationSchema>
          >,
        )}
      >
        <ProfileImageUpload
          control={profileForm.control}
          imagePreview={imagePreview}
        />

        <Input
          control={profileForm.control}
          name="nickName"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          type="text"
        />

        <Button type="submit" className="w-full mt-8">
          변경하기
        </Button>
      </form>
    </section>
  );
};

export default EditProfilePage;
