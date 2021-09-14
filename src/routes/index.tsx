import React, { FC, lazy } from "react";
import { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import AppLayout from "../pages/Layout";
import SearchPage from "../pages/User";
import WrapperComponent from "./WrapperComponent";
const AccountPage = lazy(() => import(/* webpackChunkName: "account"*/ "../pages/Account"));
const HandleExceptionPage = lazy(() => import(/* webpackChunkName: "account"*/ "../pages/HandleException"));
const NotFound = lazy(() => import(/* webpackChunkName: "404"*/ "../pages/404"));

const routeList: RouteObject[] = [
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "account-search",
        element: <WrapperComponent element={<SearchPage />} />,
      },
      {
        path: "account-search/accounts",
        element: <WrapperComponent element={<AccountPage />} />,
      },
      {
        path: "handle-exception",
        element: <WrapperComponent element={<HandleExceptionPage />} />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
