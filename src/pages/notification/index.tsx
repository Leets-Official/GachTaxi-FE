import BackButton from '@/components/commons/BackButton';
import NotificationList from '@/components/notification';
import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';
import { Suspense } from 'react';

const NotificationPage = () => {
  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal h-full">
      <BackButton />
      <h1 className="text-header font-bold">알림</h1>

      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center flex-1">
            <SpinnerIcon width={36} height={36} className="mx-auto spinner" />
          </div>
        }
      >
        <NotificationList />
      </Suspense>
    </section>
  );
};

export default NotificationPage;
