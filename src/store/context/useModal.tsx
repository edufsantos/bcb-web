/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface IModalProps {
  key: string;
  title: string;
  icon?: string;
  bodyChildren: React.ReactNode;
  closeModalProps?: {
    dontVisibilityClose?: boolean;
    dontOnCloseModal?: boolean;
    onCloseModal?: () => boolean;
  };
}

interface IModalContext {
  openModal: (args: IModalProps) => void;
  closeModal: (key: string) => void;
  closeAllModals: () => void;
}

const modalContext = createContext({} as IModalContext);

export const ModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [modals, setModals] = useState<IModalProps[]>([]);

  const openModal = (args: IModalProps) => {
    setModals((old) => [...old, args]);
  };

  const closeModal = (key: string) => {
    setModals((old) => old.filter((item) => item.key !== key));
  };

  const closeAllModals = () => {
    setModals([]);
  };

  return (
    <modalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {modals.map((modal) => (
        <Modal
          isOpen
          key={modal.key}
          onClose={() =>
            !modal.closeModalProps?.dontOnCloseModal && closeModal(modal.key)
          }
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modal.title}</ModalHeader>
            {!modal.closeModalProps?.dontVisibilityClose && (
              <ModalCloseButton onClick={() => closeModal(modal.key)} />
            )}

            <ModalBody>{modal.bodyChildren}</ModalBody>
          </ModalContent>
        </Modal>
      ))}
    </modalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(modalContext);
};
