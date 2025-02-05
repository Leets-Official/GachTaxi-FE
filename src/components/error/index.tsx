import ErrorIcon from '@/assets/icon/errorIcon.svg?react';
import BackButton from '../commons/BackButton';

const ErrorPage = () => {
  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal">
      <BackButton />
      <h1 className="font-bold text-header px-3">
        요청하신 페이지를 찾는 중 <br />
        오류가 발생했습니다.
      </h1>
      <div className="absolute bottom-0 w-full left-1/2 transform -translate-x-1/2">
        <ErrorIcon className="w-full h-auto" />
      </div>
    </section>
  );
};

export default ErrorPage;
