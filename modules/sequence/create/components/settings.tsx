import CeeqButton from "@/components/button";
import CeeqDatePicker from "@/components/datepicker";
import CeeqPopover from "@/components/popover";
import CeeqRadio from "@/components/radio";
import CeeqSwitch from "@/components/switch";
import { DownOutlined } from "@ant-design/icons";
import { Form, FormProps, Input, InputNumber, Select } from "antd";
import dayjs, { OptionType } from "dayjs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useAlertModal from "@/hooks/use-alert-modal";
import { useSequenceStore } from "@/store/use-sequence-store";
import { toast } from "react-toastify";
import { useCreateSequence } from "./hooks/use-create-sequence";
import { useSequenceCondition } from "./hooks/use-get-condition";
import { generateTimeOptions } from "@/utils/generate-data";

type FieldType = {
  sequence_name?: string;
  use_condition?: boolean;
  use_schedule?: boolean;
  condition_id?: string;
  when_reply?: boolean;
  when_appointment?: boolean;
  send_start?: string;
  send_end?: string;
  only_working_day?: boolean;
  schedule_option?: string;
  schedule_start_date?: string;
  schedule_after_days?: number;
};

function Settings() {
  const [form] = Form.useForm();
  const [mode, setMode] = React.useState("選択");
  const [optionDate, setOptionDate] = React.useState<"date" | "number">("date");
  const [watchNum, setWatchNum] = React.useState<number>(0);
  const [watchDate, setWatchDate] = React.useState<string>("");
  const [conditions, setConditions] = useState([]);
  const inputRef = useRef(null);
  const { setIsDisabledTab, setActiveKey, setSettingInput } =
    useSequenceStore();
  const { mutate: onSubmit } = useCreateSequence(
    (res) => {
      confirmSuccess();
    },
    (err) => {
      const message = err?.data?.message;
      toast.error(message);
    }
  );
  const { confirm: confirmSuccess, contextHolder: contextHolderSuccess } =
    useAlertModal(
      "",
      "設定を完了しました",
      () => {
        setIsDisabledTab({
          step: false,
          setting: true,
        });
        setActiveKey("1");
      },
      () => {},
      "ステップ設定へ",
      "",
      true
    );
  const { confirm, contextHolder } = useAlertModal(
    "",
    "ステップの作成を完了しますか？",
    () => {
      onSubmit(inputRef.current);
    },
    () => {},
    "完了",
    "キャンセル"
  );

  const { data: dataConditions } = useSequenceCondition();

  useEffect(() => {
    if (!dataConditions) {
      return;
    }
    setConditions(
      dataConditions.map((item) => ({ value: item.id, label: item.name }))
    );
  }, [dataConditions]);

  useEffect(() => {
    if (!watchNum && !watchDate) {
      return;
    }
    if (optionDate === "number") {
      setMode(watchNum.toString());
    }
    if (optionDate === "date") {
      setMode(watchDate);
    }
  }, [watchDate, watchNum, optionDate]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
    const scheduleStartDate = optionDate === "date" ? watchDate : null;
    const scheduleAfterDays = optionDate === "number" ? watchNum : null;
    const params = {
      ...values,
      schedule_option: optionDate,
      schedule_start_date: scheduleStartDate,
      schedule_after_days: scheduleAfterDays,
      start_date: "2025-07-10",
      end_date: "2025-07-31",
    };
    delete params.schedule_option;
    inputRef.current = params;
    setSettingInput(params);
    confirm();
  };

  const defaultValues: FieldType = {
    sequence_name: "",
    use_condition: false,
    use_schedule: false,
    condition_id: "",
    when_reply: false,
    when_appointment: false,
    send_start: "",
    send_end: "",
    only_working_day: false,
    schedule_option: "",
    schedule_start_date: "",
    schedule_after_days: null,
  };
  const Content = () => {
    return (
      <div className="w-full">
        <div className="flex items-center gap-x-4">
          <Form.Item name="schedule_option" className="!mb-2">
            <CeeqRadio
              title=""
              checked={optionDate === "date"}
              onChange={() => {
                setOptionDate("date");
                setMode(watchDate);
              }}
            />
          </Form.Item>
          <Form.Item name="schedule_start_date" className="w-full !mb-2">
            <CeeqDatePicker
              className="!w-full"
              onChange={(e) => setWatchDate(dayjs(e).format("YYYY-MM-DD"))}
            />
          </Form.Item>
        </div>
        <div className="flex items-center gap-x-4">
          <Form.Item name="schedule_option" className="!mb-0">
            <CeeqRadio
              title=""
              checked={optionDate === "number"}
              onChange={(e) => {
                setOptionDate("number");
                setMode(watchNum.toString());
              }}
            />
          </Form.Item>
          <Form.Item name="schedule_after_days" className="w-full !mb-0">
            <InputNumber
              className="!w-full"
              onChange={(e) => setWatchNum(+e)}
            />
          </Form.Item>
        </div>
      </div>
    );
  };

  const timeOtions = useMemo(() => generateTimeOptions(), []);

  return (
    <div className="bg-white p-6 rounded-lg w-1/2">
      <Form
        name="basic"
        initialValues={defaultValues}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item<FieldType>
          label={<span className="text-xs">管理用シーケンスタイトル</span>}
          name="sequence_name"
          className="!mb-4"
          rules={[
            {
              required: true,
              message: "Please input your 管理用シーケンスタイトル!",
            },
          ]}
        >
          <Input placeholder="シーケンスタイトル" className="w-full" />
        </Form.Item>
        <h2>シーケンスに自動登録されるトリガー</h2>
        <div className="flex items-center gap-x-4">
          <Form.Item
            name="condition_id"
            label={<span className="text-xs">フィルター条件への適合時</span>}
            className="w-3/5 !mb-0"
          >
            <Select options={conditions} />
          </Form.Item>
          <Form.Item name="use_condition" className="!mb-0" label=" ">
            <CeeqSwitch />
          </Form.Item>
        </div>
        <div className="flex items-center gap-x-4 !mb-2">
          <CeeqPopover content={<Content />} className="w-3/5">
            <label>スケジュールに従う</label>
            <div className="flex justify-between border border-[#d9d9d9] rounded-[6px] h-[32px] items-center px-[11px]">
              <span>{mode}</span>
              <DownOutlined style={{ color: "#d9d9d9" }} />
            </div>
          </CeeqPopover>
          <Form.Item name="use_schedule" className="!mb-2" label=" ">
            <CeeqSwitch />
          </Form.Item>
        </div>
        <h2 className="text-lg">シーケンスの停止条件</h2>
        <div className="flex items-center gap-x-4">
          <label className="text-sm font-bold w-3/5">
            メッセージに返信したとき
          </label>
          <Form.Item name="when_reply" className="!mb-0">
            <CeeqSwitch />
          </Form.Item>
        </div>
        <div className="flex items-center gap-x-4 mb-3">
          <label className="text-sm font-bold w-3/5">
            ミーティングを予約したとき
          </label>
          <Form.Item name="when_appointment" className="!mb-0">
            <CeeqSwitch />
          </Form.Item>
        </div>
        <h2 className="text-lg">送付する時間帯</h2>
        <div className="flex mt-1">
          <div className="w-1/3 flex gap-x-2 items-center">
            <label>開始</label>
            <Form.Item name="send_start" label={null} className="w-3/5 !mb-0">
              <Select options={timeOtions} />
            </Form.Item>
          </div>
          <div className="w-1/3 flex gap-x-2 items-center">
            <label>終了</label>
            <Form.Item name="send_end" label={null} className="w-3/5 !mb-0">
              <Select options={timeOtions} />
            </Form.Item>
          </div>
        </div>
        <div className="flex items-center gap-x-4 my-3">
          <label className="text-sm font-bold w-3/5">
            営業日にのみステップを実行する
          </label>
          <Form.Item name="only_working_day" className="!mb-0">
            <CeeqSwitch />
          </Form.Item>
        </div>
        <div className="flex gap-x-4 justify-center">
          <Form.Item label={null} className="flex justify-center !my-2">
            <CeeqButton
              title="戻る"
              loading={false}
              className="!px-6 !py-2 !bg-transparent !text-[#1A1A1A] !border-[#1A1A1A] !rounded-xs"
            />
          </Form.Item>
          <Form.Item label={null} className="flex justify-center !my-2">
            <CeeqButton
              htmlType="submit"
              title="決定"
              loading={false}
              className="!px-6 !py-2"
            />
          </Form.Item>
        </div>
        {contextHolder}
        {contextHolderSuccess}
      </Form>
    </div>
  );
}

export default Settings;
