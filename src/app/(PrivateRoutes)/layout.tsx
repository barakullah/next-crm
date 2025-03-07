// Importing the Bootstrap CSS
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AuthWrapper from "../components/auth/AuthWrapper";
import Header from "../components/header";
import Sidemenu from "../components/Menu";
import "../globals.css";
import { persistor, store } from "../store";
import { NotificationProvider } from "../components/NotificationToast";
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <div className="wrapper">
            <div className="mainArea">
              <div className="row mx-0">
                <Sidemenu children={children} />
                <div className="contentArea">
                  {" "}
                  <NotificationProvider>{children}</NotificationProvider>
                </div>
              </div>
            </div>
          </div>
        </PersistGate>
      </Provider>
    </div>
  );
}
export default AuthWrapper(RootLayout);
