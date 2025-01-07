import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { authCodeVerificationSchema } from '@/libs/schemas/auth';
import { AuthCodeTypes } from 'gachTaxi-types';
import Input from '../commons/Input';
import Button from '../commons/Button';
import { useNavigate } from 'react-router-dom';

const AuthCodeVerification = () => {
  const navigate = useNavigate();
  const authForm = useForm<z.infer<typeof authCodeVerificationSchema>>({
    resolver: zodResolver(authCodeVerificationSchema),
    defaultValues: {
      authCode: '',
    },
    mode: 'onSubmit',
  });

  const handleSubmitToAuth: SubmitHandler<AuthCodeTypes> = (data) => {
    // API 구현 시 추가 구현
    alert('인증번호 입력 성공!');
    navigate('/signup/user-info');
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
        시작하기
      </Button>
    </form>
  );
};

export default AuthCodeVerification;
