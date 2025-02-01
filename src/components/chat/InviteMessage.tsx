interface InviteMessageProps {
  invitedUsers: string[];
}

const InviteMessage = ({ invitedUsers }: InviteMessageProps) => {
  return (
    <div className="bg-[#202D22] text-assistive flex items-center justify-center w-[100%] h-[25px] rounded-3xl mb-2">
      {invitedUsers}님이 초대되었습니다.
    </div>
  );
};

export default InviteMessage;
