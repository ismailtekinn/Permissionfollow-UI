import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

const DeleteAlertContext = createContext();

const DeleteAlertProvider = ({ children }) => {
  const {
    isOpen: isOpenDeleteAlert,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();

  const values = {
    isOpenDeleteAlert,
    onOpenDeleteAlert,
    onCloseDeleteAlert,
  };

  return (
    <DeleteAlertContext.Provider value={values}>
      {children}
    </DeleteAlertContext.Provider>
  );
};

const useDeleteAlert = () => useContext(DeleteAlertContext);

export { useDeleteAlert, DeleteAlertProvider };
