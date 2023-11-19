import React from "react";
import { useFormik } from "formik";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  Text,
  Card,
} from "@chakra-ui/react";

import { fetchLogin } from "../../../api";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import validations from "./validation";
import { ADMIN } from "../../../roles";

function Signin() {
  const { login ,user} = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
      initialValues: {
      email: "",
      password: "",
    },
    
    validationSchema: validations,
    
    onSubmit: async (values, bag) => {
      try {
        const inputModel = {
          email: values.email,
          password: values.password,
        };
        const loginResponse = await fetchLogin(inputModel);
        console.log(loginResponse.data.isActive);
        
        if (!loginResponse.isSuccess) {
          bag.setErrors({ general: loginResponse.message });
        } else {
          login(loginResponse.data);

          if( loginResponse.data.roleId === ADMIN  ){
            navigate("/")
          } else if(loginResponse.data.isActive === "True"){
            navigate("/")
          }else{
            navigate("/new-password");

          }
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
            <Heading>Signin</Heading>
          </Box>

          {formik.errors.general && (
            <Box textAlign="center">
              <Alert status="error">{formik.errors.general}</Alert>
            </Box>
          )}

          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.touched.email && (
                  <Text color="red">{formik.errors.email}</Text>
                )}
              </FormControl>

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

              <Button mt={4} width={"full"} type="submit">
                Signin
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
}

export default Signin;
