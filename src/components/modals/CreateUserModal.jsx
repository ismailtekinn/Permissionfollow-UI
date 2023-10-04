import React from "react";
import {
  Alert,
  Box,
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
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "../../Context/UserContext";
import { useFormik } from "formik";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDepartments, fetchRegister } from "../../api";

function CreateUserModal() {
  const { isOpenCreateUser, onCloseCreateUser } = useUser();
  const { data } = useInfiniteQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      departmentId: null,
      isManager: false,
    },
    onSubmit: async (values, bag) => {
      try {
        const model = {
          name: values.firstName,
          lastName: values.lastName,
          email: values.email,
          departmentId: parseInt(values.departmentId),
          isManager: values.isManager,
        };
        const response = await fetchRegister(model);
        console.log("register response :", response);
        if (!response.isSuccess) {
          bag.setErrors({ general: response.message });
        } else {
          toast({
            title: "Başarılı",
            description: "Kullanıcı Oluşturuldu",
            status: "success",
          });
          onCloseCreateUser();
        }
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <Modal isOpen={isOpenCreateUser} onClose={onCloseCreateUser}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={6}>
            {formik.errors.general && (
              <Box textAlign="center">
                <Alert status="error">{formik.errors.general}</Alert>
              </Box>
            )}
            <FormControl>
              <FormLabel>Ad</FormLabel>
              <Input
                placeholder="Ad"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Soyad</FormLabel>
              <Input
                placeholder="Soyad"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Birim</FormLabel>
              <Select
                placeholder="Birim Seçiniz"
                name="departmentId"
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

            <FormControl mt={4} display="flex" alignItems="center">
              <FormLabel htmlFor="isManager" mb="0">
                Yönetici mi ?
              </FormLabel>
              <Switch
                id="isManager"
                name="isManager"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Kaydet
            </Button>
            <Button onClick={onCloseCreateUser}>Kapat</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateUserModal;
