import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { z } from 'zod';
import { userInfoVerificationSchema } from '@/libs/schemas/auth';
import { UserInfoVerificationTypes } from 'gachTaxi-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import ProfileImageUpload from '@/components/sign/userInfoVerification/ProfileImageUpload';
import useUploadImage from '@/hooks/useUploadImage';

const EditProfilePage = () => {
  const profileForm = useForm<z.infer<typeof userInfoVerificationSchema>>({
    resolver: zodResolver(userInfoVerificationSchema),
    defaultValues: {
      nickname: '',
      realName: '',
      studentNumber: '',
      gender: 'MALE',
      profilePicture: undefined,
      accountNumber: '',
    },
    mode: 'onSubmit',
  });

  const currentImage = profileForm.watch('profilePicture');
  const { imagePreview, uploadedImage, setImagePreview } =
    useUploadImage(currentImage);

  const handleSubmitChange: SubmitHandler<UserInfoVerificationTypes> = (
    data,
  ) => {
    try {
      console.log(data);
      console.log(uploadedImage);
      profileForm.setValue('nickname', '');
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
          setImagePreview={setImagePreview}
        />

        <Input
          control={profileForm.control}
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          type="text"
        />

        <Input
          control={profileForm.control}
          name="accountNumber"
          label="계좌번호"
          placeholder="계좌번호를 입력해주세요"
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
