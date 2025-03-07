import React, { createContext, useContext, useMemo } from "react";
import { notification, NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationType = "success" | "info" | "warning" | "error";

// Export the NotificationContext
export const NotificationContext = createContext<{
  openNotification: (
    placement: NotificationPlacement,
    type: NotificationType,
    message: string,
    description?: string
  ) => void;
}>({
  openNotification: () => {},
});

// NotificationToast Component
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    type: NotificationType,
    message: string,
    description?: string
  ) => {
    api[type]({
      placement,
      message,
      description,
    });
  };

  // Provide the openNotification function to the context
  const contextValue = useMemo(() => ({ openNotification }), [api]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context.openNotification;
};
