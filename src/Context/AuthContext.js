import React, { useState, useContext, createContext, useEffect } from "react";
import { fetchMe } from "../api";
import { Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  //Sayfa yenilendiğinde, localStorage'daki tokeni backende gönderiyoruz, eğer ki geçerli tokensa loggedIn ve user state'lerini dolduruyoruz
  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();

        setLoggedIn(true);
        const loggedUser = {
          firstName: me.firstName,
          lastName: me.lastName,
          roleId: me.roleId,
        };
        setUser(loggedUser);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  //fetchLogin'den sonra çağrılan metod, bu metod çağrılıyorsa başarılı bir login yapılmış demektir
  const login = (data) => {
    setLoggedIn(true);

    const loggedUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      roleId: data.roleId,
    };
    setUser(loggedUser);

    localStorage.setItem("access-token", data.token);
    setLoading(false);
  };

  const values = {
    loggedIn,
    user,
    login,
  };

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
