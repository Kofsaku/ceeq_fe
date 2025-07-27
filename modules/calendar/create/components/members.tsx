import CeeqButton from "@/components/button";
import { EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useCalendarStore } from "@/store/use-calendar";
import Image from "next/image";
import { Form, FormInstance } from "antd";
import { useMemo } from "react";
import ModalAddMember from "../../components/modal-add-member";
import { useSearchParams } from "next/navigation";

function Members({ form }: { form: FormInstance }) {
  const { groupMembers, setGroupMembers, accounts, setIsModalOpenAddMember } =
    useCalendarStore();
  const userId = Form.useWatch("user_id", form);
  const userName = useMemo(() => {
    const user = accounts.find((item) => item.value === userId);
    return user;
  }, [accounts, userId]);

  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  useEffect(() => {
    if (userId && !id) {
      setGroupMembers([
        {
          id: userId,
          value: userId,
          role_id: userName?.role_id,
          label: userName?.label,
        },
      ]);
    }
  }, [userId, id]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          このグループミーティングに参加するチームメンバーを選択します。
        </div>
        <div>
          <CeeqButton
            title="メンバーを編集"
            icon={<EditOutlined />}
            onClick={() => setIsModalOpenAddMember(true)}
          />
        </div>
      </div>
      <div>
        <div className="border-b border-gray-300 pt-3 pb-2">名前</div>
        {groupMembers.length > 0 &&
          groupMembers.map((item) => (
            <div
              className="flex gap-x-2 items-center py-4 border-b border-gray-300"
              key={item.id}
            >
              <Image
                src="/icons/member.svg"
                alt="member"
                width={23}
                height={23}
              />
              <div>
                <div>{item.label}</div>
                <div className="text-xs">カレンダーが接続されました</div>
              </div>
            </div>
          ))}
      </div>
      <ModalAddMember />
    </div>
  );
}

export default Members;
