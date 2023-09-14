/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IToastProps {
  title: string;
  type: "success" | "error" | "warn" | "info";
  toastOptions?: {
    autoClose?: number;
    toastId?: string | number;
  };
}

export interface IToastContext {
  addToast: (props: IToastProps) => void;
}

export const toastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider = ({ children }: React.PropsWithChildren<any>) => {
  const addToast = ({ title, type, toastOptions }: IToastProps) => {
    toast[type](title, toastOptions);
  };

  return (
    <toastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer />
    </toastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(toastContext);
};
