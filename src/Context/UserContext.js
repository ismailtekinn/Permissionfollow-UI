import { useDisclosure } from "@chakra-ui/hooks";
import { useContext, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const {
    isOpen: isOpenCreateUser,
    onOpen: onOpenCreateUser,
    onClose: onCloseCreateUser,
  } = useDisclosure();

  const values = {
    isOpenCreateUser,
    onOpenCreateUser,
    onCloseCreateUser,
  };

  return (
    <UserContext.Provider value={values}>{children}</UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export { useUser, UserProvider };
