import { useEffect, useState } from 'react';

interface ExitMessageProps {
  invitedUsers: string[];
}

const ExitMessage = ({ invitedUsers }: ExitMessageProps) => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const newMessage = invitedUsers
      .map((user) => `${user}님이 퇴장되었습니다.`)
      .join(' ');
    setMessage(newMessage);
  }, [invitedUsers]);

  return (
    <div className="bg-[#202D22] text-assistive flex items-center justify-center w-[100%] h-[25px] rounded-3xl mb-2">
      {message}
    </div>
  );
};

export default ExitMessage;
