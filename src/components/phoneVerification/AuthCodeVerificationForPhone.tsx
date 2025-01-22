import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { authCodeVerificationForPhoneSchema } from '@/libs/schemas/auth';
import { AuthCodeForPhoneTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import Button from '../commons/Button';

const AuthCodeVerificationForPhone = ({
  phoneNumInfo,
}: {
  phoneNumInfo: string;
}) => {
  const authForm = useForm<z.infer<typeof authCodeVerificationForPhoneSchema>>({
    resolver: zodResolver(authCodeVerificationForPhoneSchema),
    defaultValues: {
      authCode: '',
      phoneNumber: phoneNumInfo!,
    },
    mode: 'onSubmit',
  });

  const handleSubmitToAuth: SubmitHandler<AuthCodeForPhoneTypes> = (data) => {
    // API 구현 시 추가 구현
    console.table(data);
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={authForm.handleSubmit(handleSubmitToAuth)}
    >
      <Input
        control={authForm.control}
        name="authCode"
        label="인증번호"
        type="text"
        placeholder="인증번호를 입력해주세요"
      />
      <Button type="submit" className="mt-3">
        인증하기
      </Button>
    </form>
  );
};

export default AuthCodeVerificationForPhone;
