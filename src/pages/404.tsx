import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={<Typography.Text>Not Found</Typography.Text>}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          <Typography.Text>Back Home</Typography.Text>
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
