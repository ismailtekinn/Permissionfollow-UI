import React, { useEffect, useState } from "react";
import {
  TableContainer,
  SimpleGrid,
  Tbody,
  Table,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Box,
  Divider,
  AbsoluteCenter,
  Button,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Flex,
  Tooltip,
  Spacer,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import {
  AddIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { useDayoff } from "../../Context/DayoffContext";
import PersonelDeyoffModel from "../modals/PersonelDeyoffModel";
import { fetchDeleteDayoff, fetchdayoffList } from "../../api";
import { useDeleteAlert } from "../../Context/DeleteAlertContext";
import DeleteAlert from "../modals/DeleteAlert";
import moment from "moment";

function Person() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [dayoffList, setDayoffList] = useState([]);
  const {editDayoffButonClick,updateDayoffDone,setUpdateDayoffDone} = useDayoff()
  const { onOpenCreateDayoff, isOpenCreateDayoff } = useDayoff();
  
  const [willDeleteDayoffId, setWillDeleteDayoffId] = useState(null);
  const { onOpenDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();
  const toast = useToast();


  const deleteDayoff = async () => {
    var response = await fetchDeleteDayoff(willDeleteDayoffId);
   
    if(!response.isSucces){
      toast({
        title: 'Başarısız',
        description: response.message,
        status: 'error',
      });
    }else{
      toast({
        title:"Başarılı",
        description:"İzin Silindi",
        status: "succes"
    });
    setUpdateDayoffDone(!updateDayoffDone);
  }
  };

  const openDeleteAlert = (dayoffId) => {
    setWillDeleteDayoffId(dayoffId);
    onOpenDeleteAlert();
  };

  useEffect(() => {
    (async () => {
      const _dayoffList = await fetchdayoffList(page,limit);
      console.log(_dayoffList.dayoffTypeName);
      setDayoffList(_dayoffList);
    })();
  },[page,limit,updateDayoffDone]);
  

  return (
    <>
      <Card mt="30">
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            İzinlerim
          </AbsoluteCenter>
        </Box>
        <Flex alignItems="center" mr="10">
          <Spacer />
          <Button
            onClick={onOpenCreateDayoff}
            leftIcon={<AddIcon />}
            colorScheme="teal"
            variant="solid"
          >
            Yeni İzin
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
              <Th>İzin Türü</Th>
                <Th>İzin Başlangıç Tarihi</Th>
                <Th>İzin Bitiş Tarihi</Th>
                <Th>İzin Hakkında</Th>
                <Th>İzin Onay Durumu</Th>
                <Th>#</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dayoffList.length !== 0 ? (
                dayoffList?.map((dayoff) => (
                  <Tr key={dayoff.id}>
                    <Td>{dayoff.dayoffTypeName} </Td>
                    <Td>{moment(dayoff.start_Date).format(("DD/MM/YYYY"))}</Td>
                    <Td>{moment(dayoff.and_Date).format(("DD/MM/YYYY"))}</Td>
                    <Td>{dayoff.dayoff_Description}</Td>
                    <Td>
                      {dayoff.isApprove ? (
                        <CheckCircleIcon color="green.500" />
                      ) : (
                        <SmallCloseIcon color="red.500" />
                      )}
                    </Td>
                
                    
                    <Td>
                  <>
                    <Button colorScheme="teal" size="xs" onClick={() => editDayoffButonClick(dayoff)}>
                      Güncelle
                    </Button>{" "}
                    <Button colorScheme="red" size="xs" onClick={() => openDeleteAlert(dayoff.id)}>
                      Sil
                    </Button>
                  </>
                </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={9} textAlign="center">
                    Veri Bulunamadı
                  </Td>
                </Tr>
              )}
             
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
        <Flex justifyContent="center" mt="5" mb="5" alignItems="center">
          <Tooltip label="Previous Page">
            <IconButton
              onClick={() => setPage(page -1)}
              isDisabled={page === 1}
              icon={<ChevronLeftIcon h={6} w={6} />}
              mr={4}
            />
          </Tooltip>
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {page}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {limit}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            // max={pageOptions.length}
            onChange={(value) => {
              setPage(parseInt(value));
            }}
            defaultValue={page}
            value={page}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Tooltip label="Next Page">
            <IconButton
              onClick= {() => setPage(page + 1)}
              isDisabled={dayoffList.length < limit}
              ml={4}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Card>

      {isOpenCreateDayoff && <PersonelDeyoffModel />}
      {isOpenDeleteAlert && (
        <DeleteAlert
        title= "İzin Silme"
        question= "İzini İptal Etmek İstediğinize Emin Misiniz ?"
        deleteMethod={deleteDayoff}
        />
      )}
    </>
  );
}

export default Person;
