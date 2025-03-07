import { useContext } from "react";
import { NotificationContext } from "./NotificationToast"; // Adjust the path as necessary

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context.openNotification;
};
