import {
  DeleteOutlined,
  SearchOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Input, Pagination, Select } from "antd";
import React, { useState } from "react";
import CeeqButton from "@/components/button";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "スケジュール名", dataIndex: "sequence_name" },
  { title: "主催者", dataIndex: "age" },
  { title: "場所名", dataIndex: "address" },
  { title: "所要時間(分)", dataIndex: "address" },
  { title: "ミーティング予約数", dataIndex: "address" },
];

function CalendarList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataCalendar, setDataCalendar] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 2,
    search: "",
  });
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
  };

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
        <div className="relative w-1/2">
          <Input className="!pl-[35px] w-full" placeholder="検索" />
          <SearchOutlined className="absolute left-2 top-4 -translate-y-1/2 text-xl" />
        </div>
        <div className="w-1/2">
          <Select options={[]} placeholder="主催者" className="w-full" />
        </div>
        <div className="flex gap-x-[14px]">
          <CeeqButton
            title="複製"
            className="!bg-transparent !text-[#1A1A1A] !border-none !px-1"
            icon={<CopyOutlined />}
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
          dataSource={dataCalendar}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
        <div className="flex justify-center mt-4 lg:mt-[40px]">
          <Pagination defaultCurrent={3} total={total} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export default CalendarList;
