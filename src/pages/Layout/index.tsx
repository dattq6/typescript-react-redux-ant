import { Avatar, Dropdown, Layout, Menu } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps, menus } from "./MenuList";
import SuspendFallback from "./SuspendFallback";
import "./layout.less";

const { Header, Content, Sider } = Layout;
const AppLayout = () => {
  const [openKeys, setOpenkeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") navigate("/account-search");
    const selectKeys = ["/" + pathname.split("/")[1]];
    setSelectedKeys(selectKeys);
    setOpenkeys(selectKeys);
  }, [pathname]);

  const handleMenuClick = (menu: MenuProps) => {
    navigate(menu.path);
  };

  const menu = (
    <Menu>
      <Menu.Item key="2">
        <span>Daniel Chen</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <span>Logout</span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="logo">
          <img
            height={40}
            src="https://assets.esa.io/assets/lp-navbar__logo-860ed29506454ff82f7cd378d4c71e7c28d2a377821e56853f6d428b146ea6f7.svg"
            alt=""
          />
          <span>Account Management</span>
        </div>
        <div className="header-right">
          <Dropdown overlay={menu} trigger={["click"]} arrow>
            <span className="user-action">
              <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
            </span>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="app-leftsite-menu">
          <Menu mode="inline" selectedKeys={selectedKeys} openKeys={openKeys}>
            {menus.map((m) => (
              <Menu.Item onClick={() => handleMenuClick(m)} key={m.path}>
                {m.label}
              </Menu.Item>
            ))}
          </Menu>
          <div className="app-version">
            <span>version</span>
            <span className="divi">|</span>
            <span>1.0.0</span>
          </div>
        </Sider>
        <Content className="app-page-content">
          <Suspense fallback={<SuspendFallback />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
