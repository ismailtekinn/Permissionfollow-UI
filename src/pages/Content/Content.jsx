import React from "react";
import { useAuth } from "../../Context/AuthContext";
import Admin from "../../components/auth/Admin";
import Manager from "../../components/auth/Manager";
// import Personel from "../../components/auth/Personel";
import Person from "../../components/auth/Person";

function Content() {
  const { user } = useAuth();

  if (user.roleId === "1") {
    return <Admin />;
  } else if (user.roleId === "2") {
    return <Manager />;
  } else {
    return <Person />;
  }
}

export default Content;
