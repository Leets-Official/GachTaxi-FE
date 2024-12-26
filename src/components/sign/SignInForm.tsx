import z from 'zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidationSchema } from '../../libs/schemas/auth';
import { SignInTypes } from 'gachTaxi-types';

const SignInForm = () => {
  const signInForm = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
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
      <Controller
        control={signInForm.control}
        name="email"
        render={({ field }) => (
          <>
            <label htmlFor="email">이메일</label>
            <input
              autoFocus
              id="email"
              type="email"
              className={`border outline-none ${signInForm.formState.errors.email ? 'border-red-500' : ''}`}
              {...field}
            />
          </>
        )}
      />
      {signInForm.formState.errors.email && (
        <p className="text-red-500">
          {signInForm.formState.errors.email.message}
        </p>
      )}
      <Controller
        control={signInForm.control}
        name="password"
        render={({ field }) => (
          <>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              className={`border outline-none ${signInForm.formState.errors.password ? 'border-red-500' : ''}`}
              {...field}
            />
          </>
        )}
      />
      {signInForm.formState.errors.password && (
        <p className="text-red-500">
          {signInForm.formState.errors.password.message}
        </p>
      )}
      <button type="submit" className="border mt-6">
        로그인
      </button>
    </form>
  );
};

export default SignInForm;
