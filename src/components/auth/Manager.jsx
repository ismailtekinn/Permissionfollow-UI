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
import {
  fetchConfirmPermission,
  fetchDenyPermission,
  fetchpermissionList,
} from "../../api";
import { useDeleteAlert } from "../../Context/DeleteAlertContext";
import DeleteAlert from "../modals/DeleteAlert";

function Manager() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [permissonList, setpermissonList] = useState([]);
  const [willDeleteDayoffId, setWillDeleteDayoffId] = useState(null);
  const [state, setState] = useState(" ");
  const [willApproveDayoffId, setWillApproveDayoffId] = useState(null);
  const { onOpenDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();
  const toast = useToast();

  const deletePermission = async () => {
    if (state == true) {
      var response = await fetchDenyPermission(willDeleteDayoffId);
      if (response.isSucces) {
        toast({
          title: "Başarısız",
          description: response.message,
          status: "error",
        });
      } else {
        toast({
          title: "Başarılı",
          description: "İzin Reddedildi",
          status: "success",
        });
      }
    } else {
       response = await fetchConfirmPermission(willApproveDayoffId);
      if (response.isSucces) {
        toast({
          title: "Başarısız",
          description: response.message,
          status: "error",
        });
      } else {
        toast({
          title: "Başarılı",
          description: "İzin Onaylandı",
          status: "success",
        });
      }
    }
  };

  const openApproveAlert = (dayoffId) => {
    setWillApproveDayoffId(dayoffId);
    setState(false);
    onOpenDeleteAlert();
  };
  const openRejectAlert = (dayoffId) => {
    setWillDeleteDayoffId(dayoffId);
    setState(true);

    onOpenDeleteAlert();
  };

  useEffect(() => {
    (async () => {
      const _permissionList = await fetchpermissionList(page, limit);
      setpermissonList(_permissionList);
    })();
  }, [page, limit]);

  return (
    <>
      <SimpleGrid
        spacing={5}
        templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        <Card w="100%" h="100px">
          <CardHeader
            size="md"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="2xl"
            fontWeight="extrabold"
          >
            Toplam Personel
          </CardHeader>
          <CardBody>
            <Text
              fontSize="2xl"
              bgGradient="linear(to-l, red, black)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Sayı
            </Text>
          </CardBody>
        </Card>
        <Card w="100%" h="100px">
          <CardHeader
            size="md"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="2xl"
            fontWeight="extrabold"
          >
            Mevcut İzinli Sayısı
          </CardHeader>
          <CardBody>
            <Text
              fontSize="2xl"
              bgGradient="linear(to-l, red, black)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Sayı
            </Text>
          </CardBody>
        </Card>
        <Card w="100%" h="100px">
          <CardHeader
            size="md"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="2xl"
            fontWeight="extrabold"
          >
            Onay Bekleyen İzin Talebi
          </CardHeader>
          <CardBody>
            <Text
              fontSize="2xl"
              bgGradient="linear(to-l, red, black)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Sayı
            </Text>
          </CardBody>
        </Card>
        <Card w="100%" h="100px">
          <CardHeader
            size="md"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="2xl"
            fontWeight="extrabold"
          >
            Toplam İzin Sayısı / Mevcut Ay
          </CardHeader>
          <CardBody>
            <Text
              fontSize="2xl"
              bgGradient="linear(to-l, red, black)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Sayı
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Card mt="30">
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Personel İzinleri
          </AbsoluteCenter>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Ad</Th>
                <Th>Soyad</Th>
                <Th>İizin Türü</Th>
                <Th>İzin Başlangıç Tarihi</Th>
                <Th>İzin Bitiş Tarihi</Th>
                <Th>İzin Onay Durumu</Th>
                <Th>#</Th>
              </Tr>
            </Thead>
            <Tbody>
              {permissonList.length !== 0 ? (
                permissonList.map((permission) => (
                  <Tr>
                    <Td>{permission.name}</Td>
                    <Td>{permission.name}</Td>
                    <Td>{permission.dayoffTypeName}</Td>
                    <Td>{permission.start_Date}</Td>
                    <Td>{permission.end_Date}</Td>
                    <Td>{permission.isApprove.toString()}</Td>
                    <Td>
                      <Button
                        colorScheme="teal"
                        size="xs"
                        onClick={() => openApproveAlert(permission.id)}
                      >
                        Onayla
                      </Button>{" "}
                      <Button
                        colorScheme="red"
                        size="xs"
                        onClick={() => openRejectAlert(permission.id)}
                      >
                        Reddet
                      </Button>
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
              //onClick={() => gotoPage(0)}
              isDisabled={false}
              icon={<ChevronLeftIcon h={6} w={6} />}
              mr={4}
            />
          </Tooltip>
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              1
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              10
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            // max={pageOptions.length}
            // onChange={(value) => {
            //   const page = value ? value - 1 : 0;
            //   gotoPage(page);
            // }}
            defaultValue={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={1}
            // onChange={(e) => {
            //   setPageSize(Number(e.target.value));
            // }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
          <Tooltip label="Next Page">
            <IconButton
              // onClick={nextPage}
              isDisabled={false}
              ml={4}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Card>
      <Card mt="30">
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            İzinlerim
          </AbsoluteCenter>
        </Box>
        <Flex alignItems="center" mr="10">
          <Spacer />
          <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid">
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
                <Th>İzin Onay Durumu</Th>
                <Th>#</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td colSpan="5" textAlign="center">
                  Veri Bulunamadı
                </Td>
              </Tr>
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
        <Flex justifyContent="center" mt="5" mb="5" alignItems="center">
          <Tooltip label="Previous Page">
            <IconButton
              //onClick={() => gotoPage(0)}
              isDisabled={false}
              icon={<ChevronLeftIcon h={6} w={6} />}
              mr={4}
            />
          </Tooltip>
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              1
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              10
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            // max={pageOptions.length}
            // onChange={(value) => {
            //   const page = value ? value - 1 : 0;
            //   gotoPage(page);
            // }}
            defaultValue={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={1}
            // onChange={(e) => {
            //   setPageSize(Number(e.target.value));
            // }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
          <Tooltip label="Next Page">
            <IconButton
              // onClick={nextPage}
              isDisabled={false}
              ml={4}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Card>

      {isOpenDeleteAlert && (
        <DeleteAlert
          title="İzin Silme"
          question="İzini İptal Etmek İstediğinize Emin Misiniz"
          deleteMethod={deletePermission}
        />
      )}
    </>
  );
}

export default Manager;
