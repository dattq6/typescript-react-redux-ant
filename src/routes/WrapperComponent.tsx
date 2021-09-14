import { FC } from "react";

type WrapperComponentPtops = {
  element: React.ReactElement;
};
const WrapperComponent: FC<WrapperComponentPtops> = ({ element }) => {
  return element;
};

export default WrapperComponent;
