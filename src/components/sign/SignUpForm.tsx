import z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpValidationSchema } from '../../libs/schemas/auth';
import { SignUpTypes } from 'gachTaxi-types';
import Input from '../commons/Input';

const SignUpForm = () => {
  const signUpForm = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      studentId: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onBlur',
  });

  const handleSubmitToSignUp: SubmitHandler<SignUpTypes> = (data) => {
    // API 구현 시 추가 구현
    alert('회원가입 성공!');
    console.table(data);
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={signUpForm.handleSubmit(handleSubmitToSignUp)}
    >
      <Input
        control={signUpForm.control}
        name="studentId"
        label="학번"
        type="text"
        maxLength={8}
        autoFocus
      />
      <Input
        control={signUpForm.control}
        name="email"
        label="이메일"
        type="email"
      />
      <Input
        control={signUpForm.control}
        name="password"
        label="비밀번호"
        type="password"
      />
      <Input
        control={signUpForm.control}
        name="passwordConfirm"
        label="비밀번호 확인"
        type="password"
      />
      <button type="submit" className="border mt-6">
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
