import SpinnerIcon from '@/assets/icon/spinnerIcon.svg?react';

const InviteMembersLoading = () => {
  return (
    <div className="h-[101px] flex-shrink-0 bg-secondary/70 rounded-box p-vertical flex flex-col items-center justify-center">
      <SpinnerIcon width={36} height={36} className="mx-auto spinner" />
    </div>
  );
};

export default InviteMembersLoading;
