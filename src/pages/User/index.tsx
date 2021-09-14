import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { useResetLoading } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../stores";
import { getUserAccounts } from "../../stores/user/user.action";
const { Item } = Form;
const UserPage = () => {
  const { getUserAccountsStatus, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useResetLoading({
    reducer: "user",
    key: getUserAccountsStatus,
    keyName: "getUserAccountsStatus",
    successActions: () => {
      navigate("accounts");
    },
    successMessage: "Get Account Successfully.",
    useServerError: error,
  });

  const handleSubmit = (values: { userId: string }) => {
    dispatch(getUserAccounts(values));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Row gutter={20}>
        <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={8}>
          <Item name="userId">
            <Input placeholder="User Id" />
          </Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={4}>
          <Item>
            <Button htmlType="submit">Search</Button>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UserPage;
