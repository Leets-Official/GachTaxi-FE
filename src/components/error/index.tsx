import ErrorIcon from '@/assets/icon/errorIcon.svg?react';
import BackButton from '../commons/BackButton';
import { FallbackProps } from 'react-error-boundary';

const ErrorPage: React.ComponentType<FallbackProps> = () => {
  return (
    <main className="max-w-[430px] w-full min-h-screen flex flex-col mx-auto text-white">
      <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal pb-[-16px]">
        <BackButton usedPage="chat" />
        <h1 className="font-bold text-header">
          요청하신 페이지를 찾는 중 <br />
          오류가 발생했습니다.
        </h1>
        <div className="w-full flex justify-center items-center mt-auto">
          <ErrorIcon />
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
