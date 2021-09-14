import React, { FC } from 'react';
import { Spin, Alert } from 'antd';

const SuspendFallback: FC = () => {
  return (
    <Spin tip="Loading...">
      <Alert message="Page is to be loading" description="Have a nice day." type="info" />
    </Spin>
  );
};

export default SuspendFallback;
