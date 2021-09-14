import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useMemo } from "react";
import { useAppSelector } from "../../stores";

const AccountsPage = () => {
  const columns: ColumnsType<NSUser.Account> = useMemo(() => {
    return [
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Balance",
        dataIndex: "balance",
      },
    ];
  }, []);
  const { accounts } = useAppSelector((state) => state.user);
  return <Table rowKey={(account) => account.id} columns={columns || []} dataSource={accounts?.data || []} />;
};

export default AccountsPage;
