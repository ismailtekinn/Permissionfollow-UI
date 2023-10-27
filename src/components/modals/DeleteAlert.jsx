import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
  } from "@chakra-ui/react";
  import React from "react";
  import { useDeleteAlert } from "../../Context/DeleteAlertContext";
  
  function DeleteAlert({ title, question, deleteMethod }) {
    const { isOpenDeleteAlert, onCloseDeleteAlert } = useDeleteAlert();
    const clickDeleteButton = () => {
      deleteMethod();
      onCloseDeleteAlert();
    }
    return (
      <AlertDialog isOpen={isOpenDeleteAlert} onClose={onCloseDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title ? title : "Silme"}
            </AlertDialogHeader>
  
            <AlertDialogBody>
              {question ? question : "Silmek İstediğinize Emin Misiniz ?"}
            </AlertDialogBody>
  
            <AlertDialogFooter>
              <Button onClick={onCloseDeleteAlert}>İptal</Button>
              <Button colorScheme="red" ml={3} onClick={() => clickDeleteButton()}>
                Sil
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }
  
  export default DeleteAlert;
  