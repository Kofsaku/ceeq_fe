import { useCalendarStore } from "@/store/use-calendar";
import { Modal, Form, Select } from "antd";
import { useState } from "react";
import { useGetListAccounts } from "@/modules/setting/accounts/hooks/use-get-list-accounts";
import { useEffect } from "react";
import CeeqButton from "@/components/button";

function ModalAddMember() {
  const {
    isModalOpenAddMember,
    setIsModalOpenAddMember,
    setGroupMembers,
    groupMembers,
  } = useCalendarStore();
  const [form] = Form.useForm();
  const [hostUsers, setHostUsers] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [accountParams, setAccountParams] = useState({
    sort_role_id: "asc",
    search: "",
    limit: 10,
    page: 1,
  });

  const [selectedUsers, setSelectedUsers] = useState<
    {
      id: number;
      label: string;
      value: number;
      role_id: number;
    }[]
  >([]);

  const { data: dataAccounts, isLoading: isLoadingAccounts } =
    useGetListAccounts(accountParams);

  useEffect(() => {
    if (dataAccounts?.data) {
      const hostUsersFormat = dataAccounts.data.map((account: any) => ({
        id: account.id,
        label: account.full_name || account.email,
        value: account.id,
        role_id: account?.role?.id,
      }));

      if (accountParams.page === 1) {
        // First load hoặc search mới - merge với selected users
        const mergedUsers = mergeWithSelectedUsers(hostUsersFormat);
        setHostUsers(mergedUsers);
      }

      // Check if has more data
      const totalPages = Math.ceil(
        (dataAccounts.total || 0) / accountParams.limit
      );
      setHasMore(accountParams.page < totalPages);
      setIsLoadingMore(false);
    }
  }, [dataAccounts, accountParams.page]);

  const resetToInitialState = () => {
    setHostUsers([]);
    setHasMore(true);
    setIsLoadingMore(false);
    setAccountParams({
      sort_role_id: "asc",
      search: "",
      limit: 10,
      page: 1,
    });
  };

  const handleOk = () => {
    setIsModalOpenAddMember(false);
  };

  const handleCancel = () => {
    setIsModalOpenAddMember(false);
  };

  const handleSearchAccounts = (searchValue: string) => {
    setAccountParams((prev) => ({
      ...prev,
      search: searchValue,
      page: 1,
    }));
  };

  // Handle khi user select/deselect
  const handleSelectChange = (selectedValues: any[], option: any) => {
    setSelectedUsers(option);
  };

  // Function để merge selected users với new data
  const mergeWithSelectedUsers = (newUsers: any[]) => {
    const currentSelectedValues = form.getFieldValue("user_id") || [];

    // Tìm selected users từ current hostUsers
    const selectedUsers = hostUsers.filter((user) =>
      currentSelectedValues.includes(user.value)
    );

    // Merge selected users với new users (tránh duplicate)
    const mergedUsers = [...selectedUsers];
    newUsers.forEach((newUser) => {
      if (!mergedUsers.some((existing) => existing.id === newUser.id)) {
        mergedUsers.push(newUser);
      }
    });

    return mergedUsers;
  };

  // Reset về initial state nhưng preserve selected options
  const resetToInitialStateWithSelected = () => {
    const currentSelectedValues = form.getFieldValue("user_id") || [];
    const selectedUsers = hostUsers.filter((user) =>
      currentSelectedValues.includes(user.value)
    );

    setHostUsers(selectedUsers);
    setHasMore(true);
    setIsLoadingMore(false);
    setAccountParams({
      sort_role_id: "asc",
      search: "",
      limit: 10,
      page: 1,
    });
  };

  // Handle load more khi scroll
  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (hasMore && !isLoadingMore && !isLoadingAccounts) {
        setIsLoadingMore(true);
        setAccountParams((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    }
  };

  const onFinish = (values: any) => {
    setGroupMembers([...groupMembers, ...selectedUsers]);
    setIsModalOpenAddMember(false);
  };

  return (
    <Modal
      open={isModalOpenAddMember}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width={600}
    >
      <h2 className="text-center mb-4 text-[18px]">グループメンバーを編集</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="user_id"
          label={<span className="text-xs">ユーザー</span>}
          className="!mb-4"
        >
          <Select
            options={hostUsers}
            placeholder="主催者名"
            loading={isLoadingAccounts && accountParams.page === 1}
            showSearch
            filterOption={false}
            onSearch={handleSearchAccounts}
            onChange={handleSelectChange}
            mode="multiple"
            onPopupScroll={handlePopupScroll}
            notFoundContent={
              isLoadingAccounts && accountParams.page === 1
                ? "読み込み中..."
                : "データが見つかりません"
            }
          />
        </Form.Item>
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

export default ModalAddMember;
