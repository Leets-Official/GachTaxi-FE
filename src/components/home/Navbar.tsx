import Button from '@/components/commons/Button';
import HomeIcon from '@/assets/icon/homeIcon.svg?react';
import MatchIcon from '@/assets/icon/matchIcon.svg?react';
import FriendIcon from '@/assets/icon/friendsIcon.svg?react';
import NotificationIcon from '@/assets/icon/notificationIcon.svg?react';
import BasicProfileIcon from '@/assets/icon/basicProfileIcon.svg?react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  modalContent: {
    home: boolean;
    match: boolean;
    friend: boolean;
  };
  setModalContent: (content: {
    home: boolean;
    match: boolean;
    friend: boolean;
  }) => void;
}

const Navbar = ({ modalContent, setModalContent }: NavbarProps) => {
  return (
    <nav className="flex justify-between items-center bg-neutral fixed left-0 right-0 bottom-0 max-w-[430px] w-full h-[64px] px-8 mx-auto z-40">
      <Button
        variant="icon"
        className="flex flex-col items-center justify-center gap-1"
        onClick={() =>
          setModalContent({ home: true, match: false, friend: false })
        }
      >
        <HomeIcon
          className={modalContent.home ? 'text-[#ffffff]' : 'text-[#838383]'}
        />
        <span
          className={`text-[10px] ${modalContent.home ? 'text-white' : 'text-textDarkGray'}`}
        >
          홈
        </span>
      </Button>
      <Button
        variant="icon"
        className="flex flex-col items-center justify-center gap-1"
        onClick={() =>
          setModalContent({ home: false, match: true, friend: false })
        }
      >
        <MatchIcon
          className={modalContent.match ? 'text-[#ffffff]' : 'text-[#838383]'}
        />
        <span
          className={`text-[10px] ${modalContent.match ? 'text-white' : 'text-textDarkGray'}`}
        >
          수동매칭
        </span>
      </Button>
      <Button
        variant="icon"
        className="flex flex-col items-center justify-center gap-1"
        onClick={() =>
          setModalContent({ home: false, match: false, friend: true })
        }
      >
        <FriendIcon
          className={modalContent.friend ? 'text-[#ffffff]' : 'text-[#838383]'}
        />
        <span
          className={`text-[10px] ${modalContent.friend ? 'text-white' : 'text-textDarkGray'}`}
        >
          친구
        </span>
      </Button>
      <Button
        variant="icon"
        className="flex flex-col items-center justify-center gap-1"
      >
        <NotificationIcon />
        <span className={`text-[10px] text-textDarkGray`}>알림</span>
      </Button>
      <Link
        to="/mypage"
        className="flex flex-col items-center justify-center gap-1"
      >
        <div className="flex items-center rounded-full bg-textDarkGray w-[24px] h-[24px]">
          <BasicProfileIcon className="text-[#AEAEAE]" />
        </div>
        <span className="text-[10px] text-textDarkGray">프로필</span>
      </Link>
    </nav>
  );
};

export default Navbar;
