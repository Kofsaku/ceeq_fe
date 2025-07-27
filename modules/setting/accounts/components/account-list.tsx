import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Input, Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import CeeqButton from "@/components/button";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetListAccounts } from "../hooks/use-get-list-accounts";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
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
  role: {
    id: number;
    name: string;
    display_name: string;
  };
}

const columns: TableColumnsType<DataType> = [
  {
    title: "名前",
    dataIndex: "full_name",
  },
  {
    title: "メールアドレス",
    dataIndex: "email",
  },
  {
    title: "権限",
    dataIndex: "role_id",
    render: (text, record) => record.role?.display_name,
  },
];

function AccountList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataAccounts, setDataAccounts] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    search: "",
    sort_role_id: "asc",
  });
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
  };

  const { data: dataRes } = useGetListAccounts(filter);

  useEffect(() => {
    if (dataRes) {
      setDataAccounts(dataRes?.data);
      setTotal(dataRes.pagination?.total);
    }
  }, [dataRes]);

  const onChange = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page,
      limit: pageSize,
    });
  };

  return (
    <div>
      <div className="bg-[#F2F2F2] p-2 lg:px-[40px] lg:py-2 lg:flex justify-between gap-x-[14px]">
        <div className="relative w-full">
          <Input
            className="!pl-[35px] w-full"
            placeholder="検索"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <SearchOutlined className="absolute left-2 top-4 -translate-y-1/2 text-xl" />
        </div>

        <div className="flex gap-x-[14px]">
          <CeeqButton
            title="編集"
            className="!bg-transparent !text-[#1A1A1A] !border-none !px-1"
            icon={<EditOutlined />}
          />
          <CeeqButton
            title="削除"
            className="!bg-transparent !text-[#1A1A1A] !border-none !px-1"
            icon={<DeleteOutlined />}
          />
        </div>
      </div>
      <div className="p-4 lg:p-[40px]">
        <Table<DataType>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataAccounts.map((item: any) => ({
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
    </div>
  );
}

export default AccountList;
