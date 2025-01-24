import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { userInfoVerificationSchema } from '../../../libs/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../commons/Input';
import Button from '../../commons/Button';
import { UserInfoVerificationTypes } from 'gachTaxi-types';
import ProfileImageUpload from './ProfileImageUpload';
import GenderSelect from './GenderSelect';
import requestUserInfo from '@/libs/apis/auth/requestUserInfo';
import { useToast } from '@/contexts/ToastContext';
import handleAxiosError from '@/libs/apis/axiosError.api';
import useUploadImage from '@/hooks/useUploadImage';
import useRequestStatus from '@/hooks/useRequestStatus';

const UserInfoVerification = () => {
  const userInfoForm = useForm<z.infer<typeof userInfoVerificationSchema>>({
    resolver: zodResolver(userInfoVerificationSchema),
    defaultValues: {
      profilePicture: undefined,
      nickname: '',
      realName: '',
      studentNumber: '',
      gender: 'MALE',
    },
    mode: 'onBlur',
  });

  const gender = userInfoForm.watch('gender');
  const currentImage = userInfoForm.watch('profilePicture');
  const { imagePreview, uploadedImage } = useUploadImage(currentImage);
  const { openToast } = useToast();
  const { status, setSuccess, setError, setPending } = useRequestStatus();

  const handleSubmitToUserInfo: SubmitHandler<
    UserInfoVerificationTypes
  > = async (data) => {
    setPending();
    try {
      const updateData = userInfoForm.getValues();
      if (
        data.profilePicture !== uploadedImage &&
        typeof data.profilePicture !== 'string'
      ) {
        updateData.profilePicture = uploadedImage;
        const res = await requestUserInfo(updateData);
        if (res?.code === 200) {
          setSuccess();
          openToast(res.message, 'success');
        }
      } else {
        const res = await requestUserInfo(data);
        if (res?.code === 200) {
          setSuccess();
          openToast(res.message, 'success');
        }
      }
    } catch (error: unknown) {
      setError();
      const errorMessage = handleAxiosError(error);
      openToast(errorMessage, 'error');
    }
  };

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
      {userInfoForm.formState.errors.profilePicture && (
        <p className="text-red-500 mt-3">
          {userInfoForm.formState.errors.profilePicture.message}
        </p>
      )}
      <Input
        control={userInfoForm.control}
        name="nickname"
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
        name="studentNumber"
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
      <p className="text-[10px] text-[#787272] my-5 font-medium">
        * 프로필 정보는 회원 식별, 서비스 이용의 목적으로만 활용되며, <br />{' '}
        &nbsp;&nbsp;개인정보 수집 약관내용에 따라 보관됩니다.
      </p>
      <Button variant="primary" type="submit" isLoading={status === 'pending'}>
        시작하기
      </Button>
    </form>
  );
};

export default UserInfoVerification;
