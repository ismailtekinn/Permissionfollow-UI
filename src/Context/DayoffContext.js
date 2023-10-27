import { useDisclosure } from "@chakra-ui/hooks";
import { useContext, createContext, useState } from "react";

const DayoffContext = createContext();

const DayoffProvider = ({children})  => {
   
   const[editDayoff,setEditDayoff] = useState({
    id:0,
    dayoffTypeId: 0,
    start_Date: "",
    end_Date: "",
    dayoff_Location: "",
    proxyUser_Id: "",
    dayoff_Description: " ",
   });
   const [updateDayoffDone,setUpdateDayoffDone] = useState(false);

   const editDayoffButonClick = (dayoff) =>{
    setEditDayoff({
      id : dayoff.id,
      dayoffTypeId : dayoff.dayoffTypeId,
      start_Date : dayoff.start_Date,
      end_Date :dayoff.end_Date,
      dayoff_Location : dayoff.dayoff_Location,
      proxyUser_Id : dayoff.proxyUser_Id,
      dayoff_Description : dayoff.dayoff_Description,
    });
    onOpenCreateDayoff();
   };

    const onCloseCreateDayoff= () => {
      setEditDayoff({
        id:0,
        dayoffTypeId: 0,
        start_Date: "",
        end_Date: "",
        dayoff_Location: "",
        proxyUser_Id: 0,
        dayoff_Description: " ",
      });
        onClose();
      };

    const {
        isOpen: isOpenCreateDayoff,
        onOpen: onOpenCreateDayoff,
        onClose,
      } = useDisclosure();

      
      const values = {
        isOpenCreateDayoff,
        updateDayoffDone,
        editDayoff,
        onOpenCreateDayoff,
        onCloseCreateDayoff,
        editDayoffButonClick,
        setUpdateDayoffDone
      };

      return<DayoffContext.Provider value={values}>{children}</DayoffContext.Provider>;
};

const useDayoff = () => useContext(DayoffContext);

export { DayoffProvider, useDayoff };