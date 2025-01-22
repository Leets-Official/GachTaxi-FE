import Button from '@/components/commons/Button';
import Modal from '@/components/modal';
import { useModal } from '@/contexts/ModalContext';

const FriendDeleteOrBlack = ({
  id,
  setCurrentPage,
}: {
  id: number;
  setCurrentPage: (value: 'FRIEND_LIST' | 'BLACK_LIST') => void;
}) => {
  const { closeModal } = useModal();

  const setBlackListPage = () => {
    closeModal();
    setCurrentPage('BLACK_LIST');
  };

  const handleDeleteFriend = async () => {
    try {
      console.log(id);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal.Header className="font-bold text-header mt-4">
        친구를 삭제할까요?
      </Modal.Header>
      <Modal.Content className="font-medium text-captionHeader text-textDarkGray mb-10">
        친구를 삭제하거나 블랙리스트로
        <br />
        이동할 수 있어요
      </Modal.Content>
      <Modal.Footer>
        <div className="w-full flex flex-col gap-3">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleDeleteFriend}
          >
            친구 삭제
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={setBlackListPage}
          >
            블랙리스트
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default FriendDeleteOrBlack;
