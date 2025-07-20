import { CALLBACK_URL } from "@/const/env.const";
import React from "react";
import { generateMeetId } from "@/utils/common";

function SettingSchedule() {
  return (
    <div>
      <div>スケジュール設定ページのリンク</div>
      <div>{`${CALLBACK_URL}/calendar/${generateMeetId()}`}</div>
    </div>
  );
}

export default SettingSchedule;
