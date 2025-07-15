import CeeqButton from '@/components/button';
import { Modal } from 'antd'

function useAlertModal(title: string, content: string, onOk: () => void, onCancel: () => void, okText?: string, cancelText?: string, isHideCancel?: boolean) {
  const [modal, contextHolder] = Modal.useModal();
  let modalInstance: any;
  const confirm = () => {
    modalInstance = modal.confirm({
      title,
      content: <div className="text-center">{content}</div>,
      okText,
      cancelText,
      centered: true,
      destroyOnClose: true,
      icon: null,
      footer: () => (
        <div className="flex gap-x-2 justify-center">
          <CeeqButton
            title={okText ?? "完了"}
            loading={false}
            className="!px-6 !py-2"
            onClick={() => {
              onOk && onOk();
              modalInstance.destroy();
            }}
          />
          {!isHideCancel && <CeeqButton
            title={cancelText ?? "キャンセル"}
            loading={false}
            className="!px-6 !py-2 !bg-transparent !text-[#1A1A1A] !border-[#1A1A1A] !rounded-xs"
            onClick={() => {
              onCancel && onCancel();
              modalInstance.destroy();
            }}
          />}
        </div>
      ),
    });
  }
  return {
    confirm,
    contextHolder,
    modalInstance
  }
}

export default useAlertModal;
