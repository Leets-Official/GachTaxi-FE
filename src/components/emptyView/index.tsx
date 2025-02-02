import LengthZeroIcon from '@/assets/icon/lengthZeroIcon.svg?react';
import { ReactNode } from 'react';

const EmptyView = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full flex-1">
      <LengthZeroIcon />
      <p className="font-medium text-captionHeader text-textDarkGray">
        {children}
      </p>
    </div>
  );
};

export default EmptyView;
