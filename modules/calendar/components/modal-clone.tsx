import { useCalendarStore } from "@/store/use-calendar";
import { Modal, Form, Input, Select } from "antd";
import { useState } from "react";
import { useGetListAccounts } from "@/modules/setting/accounts/hooks/use-get-list-accounts";
import { useEffect } from "react";
import CeeqButton from "@/components/button";
import { useGetDetailCalendar } from "../hooks/use-get-detail";
import { CALLBACK_URL } from "@/const/env.const";
import { toast } from "react-toastify";
import { useCreateCalendar } from "../hooks/use-create-calendar";
import { useQueryClient } from "@tanstack/react-query";

function ModalClone() {
  const { isModalOpenClone, setIsModalOpenClone, selectedRowKeys } =
    useCalendarStore();
  const [form] = Form.useForm();
  const [hostUsers, setHostUsers] = useState<any[]>([]);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [accountParams, setAccountParams] = useState({
    sort_role_id: "asc",
    search: "",
    limit: 20,
    page: 1,
  });
  const queryClient = useQueryClient();
  const { data: dataAccounts, isLoading: isLoadingAccounts } =
    useGetListAccounts(accountParams);
  useEffect(() => {
    if (dataAccounts?.data) {
      const hostUsersFormat = dataAccounts.data.map((account: any) => ({
        id: account.id,
        label: account.full_name || account.email, // Hoặc account.title tùy theo field nào hiển thị tên
        value: account.id,
      }));
      setHostUsers(hostUsersFormat);
    }
  }, [dataAccounts]);

  const { data: dataDetailRes } = useGetDetailCalendar(
    Number(selectedRowKeys[0])
  );

  useEffect(() => {
    if (dataDetailRes) {
      setDataDetail(dataDetailRes);
    }
  }, [dataDetailRes]);

  const handleOk = () => {
    setIsModalOpenClone(false);
  };

  const handleCancel = () => {
    setIsModalOpenClone(false);
  };

  const handleSearchAccounts = (searchValue: string) => {
    setAccountParams((prev) => ({
      ...prev,
      search: searchValue,
      page: 1,
    }));
  };

  const { mutate: onCreateCalendar } = useCreateCalendar(
    (response) => {
      if (response) {
        toast.success("スケジュール作成成功");
        queryClient.invalidateQueries({
          queryKey: ["calendar-list"],
        });
        setIsModalOpenClone(false);
      }
    },
    (error) => {
      toast.error("スケジュール作成失敗");
    }
  );

  const onFinish = (values: any) => {
    const params = {
      ...dataDetail,
      ...values,
      slug: `${CALLBACK_URL}/calendar/${values.slug}`,
    };
    delete params.id;
    onCreateCalendar(params);
  };

  return (
    <Modal
      open={isModalOpenClone}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width={600}
    >
      <h2 className="text-center mb-4 text-[18px]">日程設定ページを複製</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label={<span className="text-xs">内部名</span>}
          className="!mb-4"
        >
          <Input placeholder="内部名" />
        </Form.Item>
        <Form.Item
          name="user_id"
          label={<span className="text-xs">主催者名</span>}
          className="!mb-4"
        >
          <Select
            options={hostUsers}
            placeholder="主催者名"
            loading={isLoadingAccounts}
            showSearch
            filterOption={false}
            onSearch={handleSearchAccounts}
            notFoundContent={
              isLoadingAccounts ? "読み込み中..." : "データが見つかりません"
            }
          />
        </Form.Item>
        <Form.Item
          name="slug"
          className="!mb-1"
          rules={[{ required: true }]}
          label={
            <span className="text-xs">スケジュール設定ページのリンク</span>
          }
        >
          <Input placeholder="12345678" />
        </Form.Item>
        <div className="text-xs ">{dataDetail?.slug}</div>
        <div className="flex gap-x-2 mt-4">
          <CeeqButton title="保存" htmlType="submit" />
          <CeeqButton
            title="キャンセル"
            className="!bg-transparent !text-gray-500"
            onClick={handleCancel}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default ModalClone;
