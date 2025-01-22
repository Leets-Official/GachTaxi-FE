import { useEffect, useState } from 'react';

interface InviteMessageProps {
  invitedUsers: string[];
}

const InviteMessage = ({ invitedUsers }: InviteMessageProps) => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const newMessage = invitedUsers
      .map((user) => `${user}님이 초대되었습니다.`)
      .join(' ');
    setMessage(newMessage);
  }, [invitedUsers]);

  return (
    <div className="bg-[#202D22] text-assistive flex items-center justify-center w-[100%] h-[25px] rounded-3xl mb-2">
      {message}
    </div>
  );
};

export default InviteMessage;
