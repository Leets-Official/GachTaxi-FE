import { useState } from 'react';
import ReportModal from '../modal/ReportModal';

interface RenderOtherMessageProps {
  senderName: string;
  message: string;
  timeStamp: string;
  imageUrl: string;
}

const RenderOtherMessage: React.FC<RenderOtherMessageProps> = ({
  senderName,
  message,
  timeStamp,
  imageUrl,
}) => {
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div className="flex items-start gap-2">
      <img
        src={imageUrl}
        alt={`${senderName}의 프로필`}
        className="w-8 h-8 rounded-full object-cover border-textDarkGray cursor-pointer"
        onClick={() => setReportModalOpen(true)}
      />
      <div className={`max-w-[70%]`}>
        <p className="text-assistive text-white mb-1">{senderName}</p>
        <div
          className={`max-w-[100%] px-4 py-2 rounded-3xl bg-[#465443] whitespace-normal`}
        >
          <p className="text-white text-body">{message}</p>
        </div>
      </div>
      <p className="text-[10px] mt-0.5 text-textDarkGray self-end">
        {new Date(timeStamp).toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </p>

      {isReportModalOpen && (
        <ReportModal
          onClose={() => setReportModalOpen(false)}
          senderName={senderName}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default RenderOtherMessage;
