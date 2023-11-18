import { useFormik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Button,
  Flex,
  Heading,
  Alert,
  useToast,
  Card,
} from "@chakra-ui/react";
import React from "react";
import { fetchUpdateUserPassword } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import validations from "./passwordUpdateValidation";


function Password() {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const userModel = {
          password: values.password,
        };
        const userUpdateResponse = await fetchUpdateUserPassword(userModel);
        if (!userUpdateResponse.isSuccess) {
          toast({
            title: "Başarısız",
            description: userUpdateResponse.message,
            status: "error",
          });
        } else {
          toast({
            title: "Başarılı",
            description: "Şifre Güncellendi",
            status: "success",
          });
          login(userUpdateResponse.data);
          navigate("/");
        }
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  return (
    <Card>
      <Flex align="center" width="full" justifyContent="center">
        <Box>
          <Box textAlign="center">
            <Heading>Update Password</Heading>
          </Box>

          {formik.errors.general && (
            <Box textAlign="center">
              <Alert status="error">{formik.errors.general}</Alert>
            </Box>
          )}

          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.touched.password && (
                  <Text color="red">{formik.errors.password}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
                {formik.touched.passwordConfirm && (
                  <Text color="red">{formik.errors.passwordConfirm}</Text>
                )}
              </FormControl>

              <Button mt={4} width={"full"} type="submit">
                Save
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
}

export default Password;
