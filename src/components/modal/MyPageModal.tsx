import Modal from '@/components/modal';
import Button from '../commons/Button';
import { useLogout, useWithdraw } from '@/utils';
import { useModal } from '@/contexts/ModalContext';

const MyPageModal = () => {
  const { onLogout } = useLogout();
  const { onWithdraw } = useWithdraw();
  const { closeModal } = useModal();

  const handleLogout = () => {
    onLogout();
    closeModal();
  };

  const handlWidthDraw = async () => {
    await onWithdraw();
    closeModal();
  };

  return (
    <>
      <Modal.Header className="font-bold text-header mt-4">
        신중하게 결정해주세요
      </Modal.Header>
      <Modal.Content className="font-medium text-captionHeader text-textDarkGray mb-10">
        로그아웃해도 나중에 다시 로그인 할 수 있지만
        <br />
        탈퇴하면 계정을 새로 만들어야 해요.
      </Modal.Content>
      <Modal.Footer>
        <div className="w-full flex flex-col gap-3">
          <Button variant="primary" className="w-full" onClick={handleLogout}>
            로그아웃
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={handlWidthDraw}
          >
            탈퇴하기
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default MyPageModal;
