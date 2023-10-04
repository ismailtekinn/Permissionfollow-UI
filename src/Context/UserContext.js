import { useDisclosure } from "@chakra-ui/hooks";
import { useContext, createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [editPersonel, setEditPersonel] = useState({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    departmentId: 0,
    isManager: false,
  });
  const [updatePersonelDone,setUpdatePersonelDone] = useState(false);

  const editButtonClick = (personel) => {
    console.log(personel);
    setEditPersonel({
      id: personel.id,
      email: personel.email,
      firstName: personel.firstName,
      lastName: personel.lastName,
      departmentId: personel.departmentId,
      isManager: personel.isManager,
    });

    onOpenCreateUser();
  };


  const onCloseCreateUser = () => {
    setEditPersonel({
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      departmentId: 0,
      isManager: false,
    });
    onClose();
  };


  const {
    isOpen: isOpenCreateUser,
    onOpen: onOpenCreateUser,
    onClose,
  } = useDisclosure();

  const values = {
    isOpenCreateUser,
    editPersonel,
    updatePersonelDone,
    onOpenCreateUser,
    onCloseCreateUser,
    editButtonClick,
    setUpdatePersonelDone
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);
export { useUser, UserProvider };
