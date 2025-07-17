import React, { useEffect } from "react";
import { Input } from "antd";
import CeeqButton from "@/components/button";
import {
  PlusOutlined,
  PlusSquareOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SvgIcon from "@/components/svg-icon";
import { useSequenceStore } from "@/store/use-sequence-store";
import ModalAddMsgTpl from "./modal-add-msg-tpl";
import { updateTree, insertChildrenBetween } from "@/utils/common";
import { uuid } from "uuidv4";
import { useGetListMsg } from "@/modules/sequence/hooks/use-get-list-msg";
import dayjs from "dayjs";

const MessageItem = ({
  content,
  date,
  id,
  title,
}: {
  content: string;
  date: string;
  id: string;
  title: string;
}) => {
  const {
    setMsgTemplate,
    setIsOpenDrawer,
    setDataSteps,
    dataSteps,
    actionIndex,
    setStepStatus,
    msgItem,
  } = useSequenceStore();
  return (
    <div className="border border-[#B3B3B3] rounded-[4px] py-3 px-4">
      <div className="content text-[#1A1A1A] font-bold text-lg">{content}</div>
      <div className="date mt-[8px] mb-[20px]">最終更新日/更新者: {date}</div>
      <div className="flex gap-x-3">
        <CeeqButton
          title="詳細"
          className="!bg-transparent !border-[#1A1A1A] !text-[#1A1A1A]"
          icon={<SvgIcon path="/filter_list.svg" />}
        />
        <CeeqButton
          title="追加"
          icon={<PlusOutlined />}
          onClick={() => {
            setMsgTemplate({
              id,
              title,
              content,
              date,
            });

            const newDataSequence = insertChildrenBetween(
              dataSteps,
              actionIndex,
              [
                {
                  id: uuid(),
                  title,
                  content,
                  isMsg: true,
                  msgType: msgItem,
                },
              ]
            );
            setDataSteps(newDataSequence);
            setIsOpenDrawer(false);
            setStepStatus("msg");
            setIsOpenDrawer(false);
          }}
        />
      </div>
    </div>
  );
};

function MessageTemplates() {
  const { messageSample, setMessageSample } = useSequenceStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data } = useGetListMsg();
  useEffect(() => {
    if (data) {
      const newData = data.map((item) => ({
        ...item,
        date: dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      }));
      setMessageSample(newData);
    }
  }, [data]);
  return (
    <div>
      <h3 className="text-[#231815] font-bold text-lg">
        メッセージテンプレート
      </h3>
      <div className="relative">
        <Input
          className="!mt-[20px] !mb-[16px] !pl-[35px]"
          placeholder="テンプレートを検索"
        />
        <SearchOutlined className="absolute left-2 top-[37px] -translate-y-1/2 text-xl" />
      </div>
      <CeeqButton
        title="新規登録"
        icon={<PlusSquareOutlined />}
        onClick={() => setIsModalOpen(true)}
      />
      <div className="flex flex-col gap-y-4 mt-4">
        {messageSample.map((item) => (
          <MessageItem
            key={item.id}
            content={item.content}
            date={item.date}
            id={item.id}
            title={item.title}
          />
        ))}
      </div>
      <ModalAddMsgTpl
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default MessageTemplates;
