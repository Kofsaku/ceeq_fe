import CeeqButton from "@/components/button";
import CeeqCheckbox from "@/components/checkbox";
import { useSequenceStore } from "@/store/use-sequence-store";
import { insertChildrenBetween } from "@/utils/common";
import { CheckCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Drawer, Form, Input } from "antd";
import { useEffect, useMemo } from "react";
import { uuid } from "uuidv4";
import { Action, MSG_ITEM, MSG_LABEL } from "../../type";
import BranchSetting from "./branch/branch-setting";
import ModalAction from "./modal-action";
import MessageTemplates from "./msg/message-templates";
import SequenceStep from "./step";
import styles from "./style.module.scss";
import TaskSetting from "./task/task-setting";

const msgOptions = Object.values(MSG_ITEM).map((item) => ({
  label: MSG_LABEL[item],
  value: item,
}));

function CeeqStepSequence() {
  const {
    dataSteps,
    setDataSteps,
    action,
    isOpenDrawer,
    setIsOpenDrawer,
    setMsgItem,
    msgItem,
    actionIndex,
    setIsModalOpen,
    stepStatus,
    setStepStatus,
    settingInput,
  } = useSequenceStore();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  const onClose = () => {
    setIsOpenDrawer(false);
  };

  const initStep = useMemo(() => {
    return {
      id: 1,
      title: "ステップ1",
      content: "シーケンスで実行される最初のアクションを選択",
    };
  }, []);

  const onChangeCheckbox = (e: any) => {
    setMsgItem(e);
  };

  useEffect(() => {
    setIsOpenDrawer(!!msgItem.length);
  }, [msgItem]);

  const renderDrawer = (action: Action) => {
    switch (action) {
      case Action.MESSAGE:
        return <MessageTemplates />;
      case Action.BRANCH:
        return <BranchSetting />;
      case Action.TASK:
        return <TaskSetting />;
      default:
        break;
    }
    return null;
  };

  useEffect(() => {
    if (settingInput) {
      form.setFieldValue("sequence_name", settingInput.sequence_name);
      console.log("🚀 ~ useEffect ~ settingInput:", settingInput);
    }
  }, [settingInput]);

  const title = useMemo(() => {
    if (action === Action.MESSAGE) {
      return "メッセージ ";
    }
    if (action === Action.BRANCH) {
      return "分岐";
    }
    if (action === Action.TASK) {
      return "タスク";
    }
    return "";
  }, [action]);

  const handleSettingAction = () => {
    if (actionIndex) {
      if (action === Action.BRANCH) {
        const newDataSequence = insertChildrenBetween(dataSteps, actionIndex, [
          {
            id: uuid(),
            title: "1・メッセージの送付",
            content:
              "シーケンスで実行される最初のメッセージの送付方法を選択(複数選択可)",
          },
          {
            id: uuid(),
            title: "2・メッセージの送付",
            content:
              "シーケンスで実行される最初のメッセージの送付方法を選択(複数選択可)",
            isHalfWidth: true,
          },
        ]);

        setDataSteps(newDataSequence);
      }

      if (action === Action.TASK) {
        if (actionIndex) {
          const newDataSequence = insertChildrenBetween(
            dataSteps,
            actionIndex,
            [
              {
                id: uuid(),
                title: "2・メッセージの送付",
                content:
                  "シーケンスで実行される最初のメッセージの送付方法を選択(複数選択可)",
                isMsg: true,
              },
            ]
          );
          setDataSteps(newDataSequence);
          setIsOpenDrawer(false);

          return;
        }
        setDataSteps([
          {
            id: uuid(),
            title: "2・メッセージの送付",
            content:
              "シーケンスで実行される最初のメッセージの送付方法を選択(複数選択可)",
            isRoot: true,
          },
        ]);
        setStepStatus("msg");
        setIsOpenDrawer(false);
      }
    }

    onClose();
  };

  const renderFooter = (action: Action) => {
    switch (action) {
      case Action.MESSAGE:
        return null;
      case Action.BRANCH:
      case Action.TASK:
        return (
          <div className="flex gap-x-2 bg-[#E6E6E6] p-[24px]">
            <CeeqButton
              title="登録"
              icon={<CheckCircleOutlined />}
              onClick={handleSettingAction}
            />
            <CeeqButton
              title="キャンセル"
              isOutlined
              onClick={onClose}
              className="!bg-transparent !border-none !underline"
            />
          </div>
        );

      default:
        break;
    }
    return null;
  };

  const renderStep = () => {
    if (stepStatus === "init") {
      return (
        <div className="border border-[#F15A22] rounded-[20px] p-8 w-1/2">
          <h2 className="font-bold">{initStep.title}</h2>
          <p className="my-6">{initStep.content}</p>
          <div className="flex justify-center">
            <CeeqButton
              title="選択"
              loading={false}
              className="!px-6 !py-2"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      );
    }
    if (action === Action.MESSAGE && stepStatus === "sns-selection") {
      return (
        <div className="border border-[#F15A22] rounded-[20px] p-8 w-1/2">
          <h2 className="font-bold">{initStep.title}</h2>
          <p className="my-6">{initStep.content}</p>

          <CeeqCheckbox options={msgOptions} onChange={onChangeCheckbox} />
        </div>
      );
    }
    return (
      dataSteps &&
      dataSteps?.map((step) => <SequenceStep step={step} parentId={step.id} />)
    );
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ sequence_name: "" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label={<span className="text-xs">管理用シーケンスタイトル</span>}
          name="sequence_name"
          className="!mb-4 w-1/2"
        >
          <Input placeholder="シーケンスタイトル1" className="w-1/2" disabled />
        </Form.Item>
      </Form>

      {renderStep()}
      <ModalAction />
      <Drawer
        title={title}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={isOpenDrawer}
        mask={false}
        maskClosable={false}
        className={styles.drawer}
        footer={renderFooter(action)}
      >
        {renderDrawer(action)}
      </Drawer>
    </div>
  );
}

export default CeeqStepSequence;
