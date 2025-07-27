import {
  DeleteOutlined,
  SearchOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Input, Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import CeeqButton from "@/components/button";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetListCalendar } from "../hooks/use-get-list-calendar";
import { useGetListHostUser } from "../hooks/use-get-host-user";
import { useRouter } from "next/navigation";
import { useCalendarStore } from "@/store/use-calendar";
import { useCopyToClipboard } from "@/hooks/use-copy-text";
import useAlertModal from "@/hooks/use-alert-modal";
import { useDeleteCalendar } from "../hooks/use-delete-calendar";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  id: number;
  settings: any;
  key: React.Key;
  name: string;
  min_booking_schedule: number;
  user_id: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  slug: string;
}

function CalendarList() {
  const {
    setActiveKey,
    setIsModalOpenClone,
    selectedRowKeys,
    setSelectedRowKeys,
  } = useCalendarStore();
  const [dataCalendar, setDataCalendar] = useState<any>([]);
  const { copyToClipboard } = useCopyToClipboard();
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    search: "",
    user_id: null,
  });
  const [hostUsers, setHostUsers] = useState<any[]>([]);
  const router = useRouter();
  const handleGoEdit = (id: number) => {
    setActiveKey("1");
    router.push(`/calendar/create?id=${id}`);
  };
  const queryClient = useQueryClient();

  const columns: TableColumnsType<DataType> = [
    {
      title: "スケジュール名",
      dataIndex: "name",
      render: (value, record) => {
        return (
          <div className="flex justify-between">
            <div>{value}</div>
            <div className="flex gap-x-2">
              <button
                className="border px-2 rounded-[4px] cursor-pointer"
                onClick={() => handleGoEdit(record?.id)}
              >
                編集
              </button>
              <button
                className="border px-2 rounded-[4px] cursor-pointer"
                onClick={() => copyToClipboard(record?.slug)}
              >
                リンクをコピー
              </button>
            </div>
          </div>
        );
      },
    },
    {
      title: "主催者",
      dataIndex: "user_id",
      render: (_, record) => record.user?.name || record?.user?.email,
    },
    { title: "場所名", dataIndex: "address" },
    {
      title: "所要時間(分)",
      dataIndex: "min_booking_schedule",
      render: (_, record) => `${record.settings.min_booking_schedule}分`,
    },
    {
      title: "ミーティング予約数",
      dataIndex: "address",
      render: (_, record) => 5,
    },
  ];
  const { data: dataHostUser } = useGetListHostUser({});
  useEffect(() => {
    if (dataHostUser) {
      const hostUsersFormat = [];
      Object.entries(dataHostUser).forEach(([key, value]) => {
        hostUsersFormat.push({
          id: value,
          label: key,
          value: value,
        });
      });
      setHostUsers(hostUsersFormat);
    }
  }, [dataHostUser]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
  };

  const { data: dataRes } = useGetListCalendar(filter);

  useEffect(() => {
    if (dataRes) {
      setDataCalendar(dataRes.records);
      setTotal(dataRes.total);
    }
  }, [dataRes]);

  const onChange = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page,
      limit: pageSize,
    });
  };

  const handleClone = () => {
    setIsModalOpenClone(true);
  };

  const { mutate: onDeleteCalendar } = useDeleteCalendar(
    (res) => {
      if (res) {
        toast.success("スケジュール削除成功");
        queryClient.invalidateQueries({
          queryKey: ["calendar-list"],
        });
      }
    },
    (error) => {
      toast.error("スケジュール削除失敗");
    }
  );

  const { confirm, contextHolder } = useAlertModal(
    "",
    "本当に削除しますか？",
    () => {
      onDeleteCalendar(Number(selectedRowKeys?.[0]));
    },
    () => {},
    "完了",
    "キャンセル"
  );

  return (
    <div>
      <div className="bg-[#F2F2F2] p-2 lg:px-[40px] lg:py-2 lg:flex justify-between gap-x-[14px]">
        <div className="relative w-1/2">
          <Input
            className="!pl-[35px] w-full"
            placeholder="検索"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <SearchOutlined className="absolute left-2 top-4 -translate-y-1/2 text-xl" />
        </div>
        <div className="w-1/2">
          <Select
            options={hostUsers}
            placeholder="主催者"
            className="w-full"
            onChange={(value) => setFilter({ ...filter, user_id: +value })}
          />
        </div>
        <div className="flex gap-x-[14px]">
          <CeeqButton
            title="複製"
            className="!bg-transparent !text-[#1A1A1A] !border-none !px-1"
            icon={<CopyOutlined />}
            onClick={handleClone}
            disabled={
              selectedRowKeys.length === 0 || selectedRowKeys.length > 1
            }
          />
          <CeeqButton
            title="削除"
            className="!bg-transparent !text-[#1A1A1A] !border-none !px-1"
            icon={<DeleteOutlined />}
            disabled={
              selectedRowKeys.length === 0 || selectedRowKeys.length > 1
            }
            onClick={() => {
              confirm();
            }}
          />
        </div>
      </div>
      <div className="p-4 lg:p-[40px]">
        <Table<DataType>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataCalendar.map((item: any) => ({
            ...item,
            key: item.id,
          }))}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
        <div className="flex justify-center mt-4 lg:mt-[40px]">
          <Pagination
            defaultCurrent={filter.page}
            total={total}
            onChange={onChange}
          />
        </div>
      </div>
      {contextHolder}
    </div>
  );
}

export default CalendarList;
