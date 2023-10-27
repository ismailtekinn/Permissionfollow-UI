import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
  // Switch,
  // Text,
  // Textarea,
  // useDisclosure,
  // useToast,
} from "@chakra-ui/react";
import { useDayoff } from "../../Context/DayoffContext";
import { useFormik } from "formik";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  fetchGetPermissions,
  fetchGetUsers,
  fetchPermissionAdd,
  fetchUpdatePermission,
} from "../../api";

function PersonelDeyoffModel() {
  const { isOpenCreateDayoff, onCloseCreateDayoff,editDayoff,setUpdateDayoffDone, updateDayoffDone } = useDayoff();

  const { data } = useInfiniteQuery({
    queryKey: ["Get-Permission"],
    queryFn: fetchGetPermissions,
   
  });

  const res = useInfiniteQuery({
    queryKey: ["Get-Users"],
    queryFn: fetchGetUsers,
    
  });
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      id:editDayoff.id,
      dayoffTypeId: editDayoff.dayoffTypeId,
      start_Date: editDayoff.start_Date,
      end_Date: editDayoff.end_Date,
      dayoff_Location: editDayoff.dayoff_Location,
      proxyUser_Id: editDayoff.proxyUser_Id,
      dayoff_Description: editDayoff.dayoff_Description,
    },
    

    onSubmit: async (values, bag) => {
      try {
        const dayoffmodel = {
          dayoffTypeId: parseInt(values.dayoffTypeId),
          start_Date: values.start_Date,
          end_Date: values.end_Date,
          dayoff_Location: values.dayoff_Location,
          proxyUserId: parseInt(values.proxyUser_Id),
          dayoff_Description: values.dayoff_Description,
        };
        debugger;
        console.log(" proxyUser_Id: " , dayoffmodel.proxyUserId);
        let response;
        

        if(values.id !==0){
          dayoffmodel.id = values.id;
          response = await fetchUpdatePermission(dayoffmodel);
          console.log('response : ' , response);
        }
        else{
          response = await fetchPermissionAdd(dayoffmodel);
          console.log(response);
        }

        if(!response.data.isSucces){
          bag.setErrors({ general: response.message });
        }
        else{
          toast({
            title:"Başarılı",
            description:"İzin Oluşturuldu",
            status:'success',
          });
        }
        onCloseCreateDayoff();
        setUpdateDayoffDone(!updateDayoffDone);

      } catch (error) {
        console.log("error : ", error);
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <>
      <Modal isOpen={isOpenCreateDayoff} onClose={onCloseCreateDayoff}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your dayoff</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>İzin Türü</FormLabel>
                <Select
                  placeholder="Select option"
                  name="dayoffTypeId"
                  value={formik.values.dayoffTypeId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {data &&
                    data.pages[0].map((page) => (
                      <option value={page.id} key={page.id}>
                        {page.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl mt={3}>
                <FormLabel>Başlangıç Tarihi</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  name="start_Date"
                  value={formik.values.start_Date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>

              <FormControl mt={3}>
                <FormLabel>Bitiş Tarihi</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  name="end_Date"
                  value={formik.values.end_Date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>

              <FormControl mt={3}>
                <FormLabel>Konum</FormLabel>
                <Input
                  placeholder="İzin günlerinde nerede olacaksın"
                  name="dayoff_Location"
                  value={formik.values.dayoff_Location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>

              <FormControl mt={3}>
                <FormLabel>Vekil Kullanıcı</FormLabel>
                <Select
                  placeholder="Select option"
                  name="proxyUser_Id"
                  value={formik.values.proxyUser_Id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {res.data &&
                    res.data.pages[0].data.map((page) => (
                      <option value={page.id} key={page.id}>
                        
                        {page.fullName } 
                      </option>
                      
                    ))}
                 
                </Select>
              </FormControl>

              <FormControl mt={3}>
                <FormLabel>Açıklama</FormLabel>
                <Textarea
                  placeholder="İzin açıklaması?"
                  name="dayoff_Description"
                  value={formik.values.dayoff_Description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onCloseCreateDayoff}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PersonelDeyoffModel;
