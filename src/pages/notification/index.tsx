import BackButton from '@/components/commons/BackButton';
import NotificationList from '@/components/notification';
import { Suspense } from 'react';

const NotificationPage = () => {
  return (
    <section className="flex-1 w-full flex flex-col gap-[32px] p-horizontal h-full">
      <BackButton />
      <h1 className="text-header font-bold">알림</h1>
      <Suspense fallback={<>로딩중...</>}>
        <NotificationList />
      </Suspense>
    </section>
  );
};

export default NotificationPage;
