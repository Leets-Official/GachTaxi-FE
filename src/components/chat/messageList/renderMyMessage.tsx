interface RenderMyMessageProps {
  message: string | null;
  timeStamp: string;
}

const RenderMyMessage: React.FC<RenderMyMessageProps> = ({
  message,
  timeStamp,
}) => {
  return (
    <>
      <p className="text-[10px] mt-1 mr-2 text-textDarkGray self-end">
        {new Date(timeStamp).toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </p>
      <div className={`max-w-[70%] px-4 py-2 rounded-3xl bg-addGreen`}>
        <p className="text-black text-body">{message}</p>
      </div>
    </>
  );
};

export default RenderMyMessage;
