import BackButton from '@/components/commons/BackButton';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { z } from 'zod';
import { profileEditVerificationSchema } from '@/libs/schemas/auth';
import { ProfileEditVerificationTypes } from 'gachTaxi-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import ProfileImageUpload from '@/components/sign/userInfoVerification/ProfileImageUpload';
import useUploadImage from '@/hooks/useUploadImage';
import { updateUserProfile } from '@/libs/apis/updateUserProfile.api';
import { useToast } from '@/contexts/ToastContext';
import useUserStore from '@/store/useUserStore';
import handleAxiosError from '@/libs/apis/axiosError.api';

const EditProfilePage = () => {
  const profileForm = useForm<z.infer<typeof profileEditVerificationSchema>>({
    resolver: zodResolver(profileEditVerificationSchema),
    defaultValues: {
      nickName: '',
      profilePicture: undefined,
      accountNumber: '',
    },
    mode: 'onSubmit',
  });

  const currentImage = profileForm.watch('profilePicture');
  const { imagePreview, uploadedImage, setImagePreview } =
    useUploadImage(currentImage);
  const { setUser } = useUserStore();
  const { openToast } = useToast();

  const handleSubmitChange: SubmitHandler<
    ProfileEditVerificationTypes
  > = async (data) => {
    try {
      console.log('제출 데이터:', data);
      const updateData = profileForm.getValues();
      if (
        data.profilePicture !== uploadedImage &&
        typeof data.profilePicture !== 'string'
      ) {
        updateData.profilePicture = uploadedImage;
        const res = await updateUserProfile(updateData);
        if (res?.code === 200) {
          const userData = res?.data;
          setUser(userData);
          openToast(res.message, 'success');
        }
      } else {
        console.log('제출 데이터2:', data);
        const res = await updateUserProfile(data);

        if (res?.code === 200) {
          if (res?.data) {
            const userData = res.data;
            setUser(userData);
          }
          openToast(res.message, 'success');
        }
      }
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      openToast(errorMessage, 'error');
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
            z.infer<typeof profileEditVerificationSchema>
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
          name="nickName"
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
