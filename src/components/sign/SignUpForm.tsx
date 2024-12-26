import z from 'zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpValidationSchema } from '../../libs/schemas/auth';
import { SignUpTypes } from 'gachTaxi-types';

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
      <Controller
        control={signUpForm.control}
        name="studentId"
        render={({ field }) => (
          <>
            <label htmlFor="studentId">학번</label>
            <input
              autoFocus
              maxLength={8}
              id="studentId"
              type="text"
              className={`border outline-none ${signUpForm.formState.errors.studentId ? 'border-red-500' : ''}`}
              {...field}
            />
          </>
        )}
      />
      {signUpForm.formState.errors.studentId && (
        <p className="text-red-500">
          {signUpForm.formState.errors.studentId.message}
        </p>
      )}
      <Controller
        control={signUpForm.control}
        name="email"
        render={({ field }) => (
          <>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              className={`border outline-none ${signUpForm.formState.errors.email ? 'border-red-500' : ''}`}
              {...field}
            />
          </>
        )}
      />
      {signUpForm.formState.errors.email && (
        <p className="text-red-500">
          {signUpForm.formState.errors.email.message}
        </p>
      )}
      <Controller
        control={signUpForm.control}
        name="password"
        render={({ field }) => (
          <>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              className={`border outline-none ${signUpForm.formState.errors.password ? 'border-red-500' : ''}`}
              {...field}
            />
          </>
        )}
      />
      {signUpForm.formState.errors.password && (
        <p className="text-red-500">
          {signUpForm.formState.errors.password.message}
        </p>
      )}
      <Controller
        control={signUpForm.control}
        name="passwordConfirm"
        render={({ field }) => (
          <>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              id="passwordConfirm"
              type="password"
              className={`border outline-none ${signUpForm.formState.errors.passwordConfirm ? 'border-red-500' : ''}`}
              {...field}
            />
          </>
        )}
      />
      {signUpForm.formState.errors.passwordConfirm && (
        <p className="text-red-500">
          {signUpForm.formState.errors.passwordConfirm.message}
        </p>
      )}
      <button type="submit" className="border mt-6">
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
