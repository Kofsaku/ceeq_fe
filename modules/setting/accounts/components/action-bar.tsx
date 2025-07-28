import CeeqButton from "@/components/button";
import { CheckCircleOutlined } from "@ant-design/icons";

function ActionBar({
  onSubmit,
  onCancel,
}: {
  onSubmit?: () => void;
  onCancel?: () => void;
}) {
  const onNext = () => {
    onSubmit();
  };
  return (
    <div
      className="w-full bg-white p-[24px] fixed bottom-0 flex items-center gap-x-2"
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <CeeqButton
        title="登録"
        icon={<CheckCircleOutlined />}
        onClick={onNext}
        className="!px-8 !py-4"
      />
      <CeeqButton
        title="キャンセル"
        isOutlined
        className="!bg-transparent !border-none !underline"
        onClick={onCancel}
      />
    </div>
  );
}

export default ActionBar;
