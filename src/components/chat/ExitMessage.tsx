interface ExitMessageProps {
  exitUsers: string[];
}

const ExitMessage = ({ exitUsers }: ExitMessageProps) => {
  return (
    <div className="bg-[#202D22] text-assistive flex items-center justify-center w-[100%] h-[25px] rounded-3xl mb-2">
      {exitUsers}님이 퇴장했습니다.
    </div>
  );
};

export default ExitMessage;
