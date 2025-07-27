import CeeqRadio from "@/components/radio";
import CeeqSwitch from "@/components/switch";
import { CALLBACK_URL } from "@/const/env.const";
import { generateMeetId } from "@/utils/common";
import {
  formatToJapaneseDate,
  generateTimeOptions,
} from "@/utils/generate-data";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, InputNumber, Select } from "antd";
import Image from "next/image";
import styles from "./style.module.scss";
import { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import CeeqCalendar from "@/components/calendar";
import { useCalendarStore } from "@/store/use-calendar";

function SettingSchedule({ form }: { form: FormInstance }) {
  const { enumOptions } = useCalendarStore();
  const [date, setDate] = useState<Dayjs | null>(null);
  const onPanelChange = (value: Dayjs) => {
    setDate(value);
  };
  const watchWorkingHours = Form.useWatch("working_hours", form);
  const watchSlug = Form.useWatch("slug", form);
  const watchTimesMeeting = Form.useWatch("duration", form);

  const timeMeeting = useMemo(() => {
    return enumOptions?.durations?.filter((item) => {
      return watchTimesMeeting?.includes(item.value);
    });
  }, [watchTimesMeeting, enumOptions?.durations]);
  const hasValidDayOfWeek = (data) => {
    return data && data.every((item) => item?.day_of_week);
  };

  const meetingUrl = useMemo(() => {
    return `${CALLBACK_URL}/calendar/`;
  }, []);

  return (
    <div className="lg:flex gap-x-2">
      <div className="w-full lg:w-1/2">
        <div>スケジュール設定ページのリンク</div>
        <div className="flex items-center">
          <span>{meetingUrl}</span>
          <Form.Item name="slug" className="!mb-1" rules={[{ required: true }]}>
            <Input placeholder="12345678" />
          </Form.Item>
        </div>
        <div className="text-gray-900 font-bold my-4">スケジュール</div>
        <Form.Item
          name="title_setting"
          label={<span className="text-xs">スケジュール設定のタイトル</span>}
          className="!mb-1"
        >
          <Input placeholder="スケジュール設定のタイトル" />
        </Form.Item>
        <Form.Item name="duration" className="!mb-4">
          <Select
            options={enumOptions?.durations}
            placeholder="1時間"
            mode="multiple"
          />
        </Form.Item>
        <Form.List name="working_hours">
          {(fields, { add, remove }) => {
            return (
              <div>
                <span>空き状況ウィンドウ</span>
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2 mt-2 items-center">
                    <Form.Item
                      name={[field.name, "day_of_week"]}
                      className="!mb-0 w-1/4"
                    >
                      <Select
                        options={enumOptions?.days_of_week}
                        placeholder="月〜金"
                      />
                    </Form.Item>
                    <div className="!flex !gap-x-1 !items-center w-1/4">
                      <span className="w-1/4">開始</span>
                      <Form.Item
                        name={[field.name, "start_time"]}
                        className="!mb-0 w-full"
                      >
                        <Select
                          options={enumOptions?.start_times}
                          placeholder="開始"
                        />
                      </Form.Item>
                    </div>
                    <div className="!flex !gap-x-1 !items-center w-1/4">
                      <span className="w-1/4">終了</span>
                      <Form.Item
                        name={[field.name, "end_time"]}
                        className="!mb-0 w-full"
                      >
                        <Select
                          options={enumOptions?.end_times}
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
          <Form.Item name="use_working_hours" className="!mb-0">
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
          <Form.Item name="booking_window_type" className="!mb-0">
            <CeeqRadio options={enumOptions?.booking_window_types} />
          </Form.Item>
          <span className="text-xs">予約可能時間</span>
          <div className="flex gap-x-2 mb-2">
            <Form.Item name="notice_time_value" className="!mb-0 w-1/2 ">
              <InputNumber className="!w-full" />
            </Form.Item>
            <Form.Item name="notice_time_type" className="!mb-0 w-1/2">
              <Select options={enumOptions?.notice_time_types} />
            </Form.Item>
          </div>
          <Form.Item
            name="min_booking_schedule"
            label={
              <span className="text-xs">
                最小通知時間(ミーティングを予約できるまでの最短時間)
              </span>
            }
            className="!mb-2"
          >
            <Select options={enumOptions?.durations} />
          </Form.Item>
          <Form.Item
            name="buffer_time"
            label={
              <span className="text-xs">
                予備時間(ミーティング前後の予約不可の時間)
              </span>
            }
            className="!mb-0"
          >
            <Select options={enumOptions?.durations} />
          </Form.Item>
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-2 lg:px-14 pt-3 lg:pt-8">
        <div className={styles.calendarLink}>
          <div className="mx-4">
            <Input value={`${CALLBACK_URL}/calendar/${watchSlug}`} disabled />
          </div>
          <div className="my-4">
            <h2 className="text-center font-bold bg-[#f2f2f2] mx-4 pt-2">
              スケジュール名
            </h2>
            <CeeqCalendar
              onChange={onPanelChange}
              disabledDate={(current) => {
                const currentDay = current.day();
                if (hasValidDayOfWeek(watchWorkingHours)) {
                  const dayOfWeekValues = watchWorkingHours.map(
                    (item) => item.day_of_week
                  );

                  let enabledDays = new Set();

                  dayOfWeekValues.forEach((dayValue) => {
                    if (dayValue === 0) {
                      enabledDays = new Set([0, 1, 2, 3, 4, 5, 6]);
                    } else if (dayValue === 1) {
                      [1, 2, 3, 4, 5].forEach((day) => enabledDays.add(day));
                    } else if (dayValue === 2) {
                      [0, 6].forEach((day) => enabledDays.add(day));
                    } else if (dayValue === 9) {
                      enabledDays.add(0);
                    } else if (dayValue >= 3 && dayValue <= 8) {
                      const correspondingDay = dayValue - 2;
                      enabledDays.add(correspondingDay);
                    }
                  });

                  const shouldDisable = !enabledDays.has(currentDay);
                  return shouldDisable;
                }

                return false; // Nếu không có working_hours hợp lệ, enable tất cả
              }}
            />
          </div>
          {date && (
            <div className="lg:flex px-4 mb-4">
              <div className="lg:w-1/2">
                <div className="mb-3 font-bold">
                  お時間はどれくらいいただけますか？
                </div>
                {timeMeeting?.map((item) => (
                  <div
                    key={item.value}
                    className="border w-[80px] rounded-[4px] py-1 text-center font-bold cursor-pointer mb-2"
                  >
                    <div>{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="lg:w-1/2">
                <div
                  className="mb-3 font-bold"
                  dangerouslySetInnerHTML={{
                    __html: `<span>ご都合の良い時間をご指定ください。</span><br /><span>${formatToJapaneseDate(date)} の時間を表示しています</span>`,
                  }}
                />
                <div className="max-h-[176px] w-max px-3 overflow-y-scroll">
                  {generateTimeOptions().map((item) => (
                    <div
                      key={item.value}
                      className="border w-[80px] rounded-[4px] py-1 text-center font-bold cursor-pointer mb-2"
                    >
                      <div>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingSchedule;
