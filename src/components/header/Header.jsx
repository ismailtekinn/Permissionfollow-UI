import React from "react";
import styles from "./header.module.css";
import { Button, Stack } from "@chakra-ui/react";
import { useAuth } from "../../Context/AuthContext";
import { useUser } from "../../Context/UserContext";
import CreateUserModal from "../modals/CreateUserModal";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN, MANAGER } from "../../roles";



function Header() {
  const { user, loggedIn, logout } = useAuth();
  const { onOpenCreateUser, isOpenCreateUser } = useUser();
  const navigate = useNavigate();
  return (
    loggedIn && (
      <div className={styles.nav}>
        <div className={styles.left}>Logo</div>
        <div className={styles.right}>
          <Stack direction="row" spacing={4} align="right">
            <Button colorScheme="teal" variant="link" onClick={() => navigate('/')}>
              {user.firstName} {user.lastName}
            </Button>

            {user.roleId === ADMIN && (
              <Button colorScheme="teal" size="md" onClick={onOpenCreateUser}>
                Yeni Personel
              </Button>
            )}
            {(user.roleId === ADMIN || user.roleId === MANAGER) && (
                <Button
                  colorScheme="teal"
                  size="md"
                  as={Link}
                  to="/personel-list"
                >
                  Personel Listesi
                </Button>
              )}
            <Button colorScheme="teal" size="md" onClick={logout}>
              Logout
            </Button>

            {user.roleId !== ADMIN && (

            <Button 
            colorScheme="teal"
            size="md" 
            as={Link}
            to="/new-password"
            >
              Şifre Yenile
            </Button>
            )}
          </Stack>
        </div>
        {isOpenCreateUser && <CreateUserModal />}
      </div>
    )
  );
}

export default Header;
