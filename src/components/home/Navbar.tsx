import Button from '@/components/commons/Button';
import HomeIcon from '@/assets/icon/homeIcon.svg?react';
import MatchIcon from '@/assets/icon/matchIcon.svg?react';
import FriendIcon from '@/assets/icon/friendsIcon.svg?react';
import NotificationIcon from '@/assets/icon/notificationIcon.svg?react';
import BasicProfileIcon from '@/assets/icon/basicProfileIcon.svg?react';
import { Link } from 'react-router-dom';
import useSheetStore from '@/store/useSheetStore';
import { useEffect, useState } from 'react';
import { getUnreadNotification } from '@/libs/apis/notification';
import handleAxiosError from '@/libs/apis/axiosError.api';

interface NavbarProps {
  modalContent: {
    home: boolean;
    match: boolean;
    friend: boolean;
  };
}

const Navbar = ({ modalContent }: NavbarProps) => {
  const { openHome, openMatch, openFriend } = useSheetStore();
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState<
    boolean | undefined
  >(false);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const res = await getUnreadNotification();
        if (res.code >= 200 && res.code < 300) {
          return res.data.hasUnreadNotifications === true;
        }
        return false;
      } catch (e: unknown) {
        const errorMessage = handleAxiosError(e);
        console.error(errorMessage);
        return false;
      }
    };

    const checkNotifications = async () => {
      if (!hasUnreadNotifications) {
        const notiState = await fetchUnreadNotifications();
        if (notiState) {
          setHasUnreadNotifications(notiState);
        }
      }
    };

    checkNotifications();
  }, [hasUnreadNotifications]);

  return (
    <nav className="flex justify-between items-center bg-neutral fixed left-0 right-0 bottom-0 max-w-[430px] w-full h-[64px] px-8 mx-auto z-40">
      <Button
        variant="icon"
        className="flex flex-col items-center justify-center gap-1"
        onClick={openHome}
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
        onClick={openMatch}
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
        onClick={openFriend}
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
      <Link
        to="/notification"
        className="flex flex-col items-center justify-center gap-1 relative"
      >
        <NotificationIcon />
        {hasUnreadNotifications && (
          <span className="rounded-full w-2 h-2 absolute top-0 right-0 bg-red-600" />
        )}
        <span className={`text-[10px] text-textDarkGray`}>알림</span>
      </Link>
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
