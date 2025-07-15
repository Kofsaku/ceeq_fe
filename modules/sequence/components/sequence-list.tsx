import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import CeeqButton from "@/components/button";
import { Button, Flex, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetListSequences } from "../hooks/use-get-list";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "テンプレート", dataIndex: "sequence_name" },
  { title: "登録者", dataIndex: "age" },
  { title: "作成者", dataIndex: "address" },
  { title: "開封数", dataIndex: "address" },
  { title: "クリック率", dataIndex: "address" },
  { title: "返信率", dataIndex: "address" },
  { title: "バウンス率", dataIndex: "address" },
  { title: "商談設定率", dataIndex: "address" },
  { title: "成約率", dataIndex: "address" },
  { title: "作成日", dataIndex: "created_at" },
  { title: "変更日", dataIndex: "updated_at" },
];

function SequenceList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSequence, setDataSequence] = useState<any>([]);
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
  const { data } = useGetListSequences(filter);

  useEffect(() => {
    if (!data) {
      return;
    }
    setDataSequence(data.data.map((item: any) => ({ ...item, key: item.id })));
    setTotal(data.total);
  }, [data]);

  return (
    <div>
      <div className="bg-[#F2F2F2] p-2 lg:px-[40px] lg:py-2 lg:flex justify-between gap-x-[14px]">
        <div className="relative w-full">
          <Input className=" !pl-[35px] w-full" placeholder="検索" />
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
          dataSource={dataSequence}
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

export default SequenceList;
