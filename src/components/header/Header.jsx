import React from "react";
import styles from "./header.module.css";
import { Button, Stack } from "@chakra-ui/react";
import { useAuth } from "../../Context/AuthContext";

function Header() {
  const { user, loggedIn } = useAuth();
  return (
    loggedIn && (
      <div className={styles.nav}>
        <div className={styles.left}>Logo</div>
        <div className={styles.right}>
          <Stack direction="row" spacing={4} align="right">
            <Button colorScheme="teal" variant="link">
              {user.firstName} {user.lastName}
            </Button>
            <Button colorScheme="teal" size="md">
              Logout
            </Button>
          </Stack>
        </div>
      </div>
    )
  );
}

export default Header;
