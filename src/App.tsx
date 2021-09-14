import { Button, ConfigProvider, Result } from "antd";
import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RenderRouter from "./routes";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="console" onClick={() => window.location.reload()}>
          Go Home
        </Button>
      }
    />
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider componentSize="large">
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <RenderRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
