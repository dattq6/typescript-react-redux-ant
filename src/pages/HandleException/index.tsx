import { Typography } from "antd";
import React, { useEffect, useState } from "react";

const HandleExceptionPage = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  if (count === 0) {
    throw new Error("aaaaa");
  }

  return (
    <div>
      <Typography.Title level={1}>{`Page will crash in ${count} second.`}</Typography.Title>
    </div>
  );
};

export default HandleExceptionPage;
