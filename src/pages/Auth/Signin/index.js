import React, { useState } from "react";

import { useFormik } from 'formik'

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../Context/AuthContext";
// import { useFormik } from 'formik'

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useAuth();

  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  


//   const hangleSignin = (e) => {
//     e.preventDefault();
//     const data = {
//       Email: email,
//       Password: password,
//     };
//     const url = "https://localhost:44373/Auth/Login";
//     axios
//       .post(url, data)
//       .then((res) => res.data)
//       .then((data) => { console.log(data);
//         if (data.isSuccess === false) {
//           setError(data.message);
//         } else {
//           localStorage.setItem("token", data.data.token);
//           // navigate("/");
//         }
//       })
// };

const formik = useFormik({
  initialValues: {
    email:"",password:"",passwordConfirm:""
  },


  onSubmit: async (values, bag ) => {
   try{
    const loginResponse = await fetchLogin({email:values.email, password:values.password});
    login()


    // history.push('/profile');
    // browserHistory.push('/profile');
    console.log(loginResponse)
   }
   catch(e){
     bag.setErrors({general:e.response.data.message});
   }
  }
});


    
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box>
          <Box textAlign="center">
            <Heading>Signin</Heading>
          </Box>

          {error !== "" ? (
            <Box textAlign="center">
              <Alert status="error">{error}</Alert>
             
            </Box>
          ) : (
            ""
          )}

          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-Mail</FormLabel>

                <Input
                  name="email"
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>

                <Input
                  name="password"
                  type="password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
              </FormControl>

              <Button
                mt={4}
                width={"full"}
                type="submit"
                // onClick={(e) => hangleSignin(e)}
              >
                Signin
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
