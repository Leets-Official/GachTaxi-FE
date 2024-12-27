import z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidationSchema } from '../../libs/schemas/auth';
import { SignInTypes } from 'gachTaxi-types';
import Input from '../commons/Input';

const SignInForm = () => {
  const signInForm = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const handleSubmitToSignIn: SubmitHandler<SignInTypes> = (data) => {
    // API 구현 시 추가 구현
    alert('로그인 성공!');
    console.table(data);
  };

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={signInForm.handleSubmit(handleSubmitToSignIn)}
    >
      <Input
        control={signInForm.control}
        name="email"
        label="이메일"
        type="email"
        autoFocus
      />
      <Input
        control={signInForm.control}
        name="password"
        label="비밀번호"
        type="password"
      />
      <button type="submit" className="border mt-6">
        로그인
      </button>
    </form>
  );
};

export default SignInForm;
