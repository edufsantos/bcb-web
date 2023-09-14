/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren } from "react";
import { ModalProvider } from "./useModal";
import { ToastProvider } from "./useToast";

const appContext = createContext({});

export const AppProvider = ({ children }: PropsWithChildren<any>) => {
  return (
    <appContext.Provider value={{}}>
      <ToastProvider>
        <ModalProvider> {children}</ModalProvider>
      </ToastProvider>
    </appContext.Provider>
  );
};
