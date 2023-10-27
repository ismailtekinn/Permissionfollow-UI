import { useFormik } from 'formik';
import { 
  
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Text,
    Button,
    Flex,
    Heading,
    Alert,
    useToast,

 } from '@chakra-ui/react'
import React from 'react'
import { fetchUpdateUserPassword } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function Password() {


  const navigate = useNavigate();
  const toast = useToast();
  const formik = useFormik({
    initialValues: { 
      password: "",
      passwordConfirm: ""
     },

    onSubmit: async (values,bag) => {
      try{
        const userModel = {
          password: values.password,
        };
        const userUpdateResponse = await fetchUpdateUserPassword(userModel);

        console.log(userUpdateResponse);
        navigate("/")
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
    }
      }catch(e){
        bag.setErrors({general: e.response.data.message});
      }
    }
  })
  return (
    <div>
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
                <FormLabel>Password Confirm</FormLabel>
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
                Save
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Password;
