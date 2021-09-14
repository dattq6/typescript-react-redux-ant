import { notification } from "antd";
import { useEffect } from "react";
import { AppState, resetLoading, useAppDispatch } from "../stores";

interface UseResetLoadingType {
  successMessage?: string;
  successActions?: () => void;
  failedMessage?: string;
  falledActions?: () => void;
  key: ActionStatus;
  keyName: string;
  reducer: keyof AppState;
  useServerError?: any;
}
export const useResetLoading = ({
  reducer,
  key,
  keyName,
  successMessage,
  successActions,
  falledActions,
  failedMessage,
  useServerError,
}: UseResetLoadingType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (key === "success") {
      if (successMessage) notification.success({ message: successMessage });
      if (successActions) successActions();
      dispatch(resetLoading({ reducer, loadingKey: keyName }));
    } else if (key === "failed") {
      if (useServerError?.data) notification.error({ message: useServerError.data });
      if (failedMessage) notification.error({ message: failedMessage });
      if (falledActions) falledActions();
      dispatch(resetLoading({ reducer, loadingKey: keyName }));
    }
  }, [key]);
};
