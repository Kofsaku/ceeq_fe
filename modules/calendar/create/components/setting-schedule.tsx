import CeeqRadio from "@/components/radio";
import CeeqSwitch from "@/components/switch";
import { CALLBACK_URL } from "@/const/env.const";
import { generateMeetId } from "@/utils/common";
import { generateTimeOptions } from "@/utils/generate-data";
import { PlusOutlined } from "@ant-design/icons";
import { Button, CalendarProps, Form, Input, InputNumber, Select } from "antd";
import Image from "next/image";
import styles from "./style.module.scss";
import CeeqDatePicker from "@/components/datepicker";
import CeeqCalendar from "@/components/calendar";
import { Dayjs } from "dayjs";

const weekOptions = [
  {
    label: "月〜金",
    value: "月〜金",
  },
  {
    label: "月曜日",
    value: "月曜日",
  },
  {
    label: "火曜日",
    value: "火曜日",
  },
  {
    label: "水曜日",
    value: "水曜日",
  },
];

const frequencyOptions = [
  {
    label: "15分",
    value: "15分",
  },
  {
    label: "30分",
    value: "30分",
  },
  {
    label: "45分",
    value: "45分",
  },
  {
    label: "1時間",
    value: "1時間",
  },
];

const whenReplyOptions = [
  {
    label: "期間(移動)にわたって",
    value: "1",
  },
  {
    label: "カスタム日付範囲",
    value: "2",
  },
];

const openingOptions = [
  {
    label: "週",
    value: "週",
  },
  {
    label: "日",
    value: "日",
  },
  {
    label: "営業日",
    value: "営業日",
  },
];

const meetingId = generateMeetId();

function SettingSchedule() {
  const onPanelChange = (value: Dayjs) => {
    console.log(value.format("YYYY-MM-DD"));
  };
  return (
    <div className="lg:flex gap-x-2">
      <div className="w-full lg:w-1/2">
        <div>スケジュール設定ページのリンク</div>
        <div>{`${CALLBACK_URL}/calendar/${meetingId}`}</div>
        <div className="text-gray-900 font-bold my-4">スケジュール</div>
        <Form.Item
          name="schedule_title"
          label={<span className="text-xs">スケジュール設定のタイトル</span>}
          className="!mb-1"
        >
          <Input placeholder="スケジュール設定のタイトル" />
        </Form.Item>
        <Form.Item name="frequency" className="!mb-4">
          <Select options={frequencyOptions} placeholder="1時間" />
        </Form.Item>
        <Form.List name="fields">
          {(fields, { add, remove }) => {
            return (
              <div>
                <span>空き状況ウィンドウ</span>
                {fields.map((field, index) => (
                  <div key={field.key} className="flex gap-2 mt-2 items-center">
                    <Form.Item name={"weekly"} className="!mb-0 w-1/4">
                      <Select options={weekOptions} placeholder="月〜金" />
                    </Form.Item>
                    <div className="!flex !gap-x-1 !items-center w-1/4">
                      <span className="w-1/4">開始</span>
                      <Form.Item name={"start"} className="!mb-0 w-full">
                        <Select
                          options={generateTimeOptions()}
                          placeholder="開始"
                        />
                      </Form.Item>
                    </div>
                    <div className="!flex !gap-x-1 !items-center w-1/4">
                      <span className="w-1/4">終了</span>
                      <Form.Item name={"end"} className="!mb-0 w-full">
                        <Select
                          options={generateTimeOptions()}
                          placeholder="終了"
                        />
                      </Form.Item>
                    </div>
                    {fields.length > 1 ? (
                      <div
                        onClick={() => remove(field.name)}
                        className="cursor-pointer"
                      >
                        <Image
                          src="/delete.svg"
                          width={16}
                          height={18}
                          alt="delete"
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="default"
                    onClick={() => add()}
                    className="!border-none"
                  >
                    <PlusOutlined /> 時間を追加
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold w-3/5">勤務時間を考慮</span>
          <Form.Item name="only_working_day" className="!mb-0">
            <CeeqSwitch />
          </Form.Item>
        </div>
        <p>
          ユーザーがミーティングに対応可能な時間を把握するために勤務時間を確認。ユーザーが勤務時間外の場合はミーティングを予約できません。
        </p>
        <div className="border border-gray-100 rounded-[8px] p-4 mt-4">
          <span className="text-xs">
            ミーティングをスケジュール設定できるタイミング
          </span>
          <Form.Item name="when_appointment" className="!mb-0">
            <CeeqRadio options={whenReplyOptions} />
          </Form.Item>
          <span className="text-xs">予約可能時間</span>
          <div className="flex gap-x-2 mb-2">
            <Form.Item name="days" className="!mb-0 w-1/2 ">
              <InputNumber className="!w-full" />
            </Form.Item>
            <Form.Item name="unit" className="!mb-0 w-1/2">
              <Select options={openingOptions} />
            </Form.Item>
          </div>
          <Form.Item
            name="min_notice_time"
            label={
              <span className="text-xs">
                最小通知時間(ミーティングを予約できるまでの最短時間)
              </span>
            }
            className="!mb-2"
          >
            <Select options={frequencyOptions} />
          </Form.Item>
          <Form.Item
            name="reserve_time"
            label={
              <span className="text-xs">
                予備時間(ミーティング前後の予約不可の時間)
              </span>
            }
            className="!mb-0"
          >
            <Select options={frequencyOptions} />
          </Form.Item>
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-2 lg:px-14 pt-3 lg:pt-8">
        <div className={styles.calendarLink}>
          <div className="mx-4">
            <Input value={`${CALLBACK_URL}/calendar/${meetingId}`} disabled />
          </div>
          <div className="my-4">
            <h2 className="text-center font-bold bg-[#f2f2f2] mx-4 pt-2">
              スケジュール名
            </h2>
            <CeeqCalendar onChange={onPanelChange} />
          </div>
          <div className="lg:flex px-4">
            <div className="lg:w-1/2">
              <span>お時間はどれくらいいただけますか？</span>
              <div>30分</div>
              <div>1時間</div>
            </div>
            <div className="lg:w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingSchedule;
