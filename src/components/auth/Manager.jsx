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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Card, Text } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  fetchConfirmPermission,
  fetchMainInformation,
  fetchpermissionList,
} from "../../api";
import { useDeleteAlert } from "../../Context/DeleteAlertContext";
import DeleteAlert from "../modals/DeleteAlert";
import moment from "moment";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import CardItem from "./CardItem"

function Manager() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [updateTable, setUpdateTable] = useState(false);


  const [permissonList, setpermissonList] = useState([]);
  const [willApproveDayoffId, setWillApproveDayoffId] = useState(null);
  const { onOpenDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();
  
  // const [willDeleteDayoffId, setWillDeleteDayoffId] = useState(null);
  // const [state, setState] = useState(" ");
  const [isApprove,setIsApprove] = useState(null);


  const toast = useToast();
  useEffect(() => {
    (async () => {
      const _permissionList = await fetchpermissionList(page, limit);
      setpermissonList(_permissionList);
    })();
  }, [page, limit, updateTable]);

  //! AŞAĞIDAKİ GİBİ YAPILMASININ  SEBEBİ : İZİN TALEBİ ÜZERİNDE DEĞİŞİKLİK OLDUĞUNDA SAYILARIN CACHE SİLİNİP TEKRAR ÇEKİLMESİ GEREKTİĞİDİR, AYRICA ONAYLAMA VE REDDETME İŞLEMİ TEK METODDA TOPLANDI
  const queryClient = useQueryClient();
  const dayoffMutation = useMutation(fetchConfirmPermission, {
    onSuccess: () => queryClient.invalidateQueries(["main-information"]),
  });


  const deletePermission = async () => {
    const res = await dayoffMutation.mutateAsync({
      dayoffId: willApproveDayoffId,
      isApprove: isApprove,
    });

    if (res.isSuccess) {
      setUpdateTable(!updateTable);
      toast({
        title: "Başarılı",
        description: "İşlem Tamamlandı",
        status: "success",
      });
    } else {
      toast({
        title: "Başarısız",
        description: res.message,
        status: "error",
      });
    }
  };

  
  // const deletePermission = async () => {
  //   if (state == true) {
  //     var response = await fetchDenyPermission(willDeleteDayoffId);
  //     if (response.isSucces) {
  //       toast({
  //         title: "Başarısız",
  //         description: response.message,
  //         status: "error",
  //       });
  //     } else {
  //       toast({
  //         title: "Başarılı",
  //         description: "İzin Reddedildi",
  //         status: "success",
  //       });
  //     }
  //   } else {
  //      response = await fetchConfirmPermission(willApproveDayoffId);
  //     if (response.isSucces) {
  //       toast({
  //         title: "Başarısız",
  //         description: response.message,
  //         status: "error",
  //       });
  //     } else {
  //       toast({
  //         title: "Başarılı",
  //         description: "İzin Onaylandı",
  //         status: "success",
  //       });
  //     }
  //   }
  // };

  const openApproveAlert = (dayoffId,isApprove) => {
    setWillApproveDayoffId(dayoffId);
    setIsApprove(isApprove);
    onOpenDeleteAlert();
  };
  // const openRejectAlert = (dayoffId) => {
  //   setWillDeleteDayoffId(dayoffId);
  //   setState(true);

  //   onOpenDeleteAlert();
  // };


  const { status, data, error } = useInfiniteQuery({
    
    queryKey: ["main-information"],
    queryFn: fetchMainInformation,
  });

  if (status === "isLoading")
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  if (status === "error") return "An error occurred " + error.message;

  return (
    <>
    <SimpleGrid
      spacing={5}
      templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
    >
      {data &&
        data.pages[0].data.map((item, index) => (
          <CardItem text={item.text} count={item.count} key={index} />
        ))}
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
                <Tr key={permission.id}>
                  <Td>{permission.name}</Td>
                  <Td>{permission.name}</Td>
                  <Td>{permission.dayoffTypeName}</Td>
                  <Td>
                    {moment(permission.start_Date).format("DD/MM/YYYY")}
                  </Td>
                  <Td>{moment(permission.end_Date).format("DD/MM/YYYY")}</Td>
                  <Td>
                    {permission.isApprove ? (
                      <CheckCircleIcon color="green.500" />
                    ) : (
                      <SmallCloseIcon color="red.500" />
                    )}
                  </Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      size="xs"
                      onClick={() => openApproveAlert(permission.id, true)}
                    >
                      Onayla
                    </Button>{" "}
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={() => openApproveAlert(permission.id, false)}
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
            setPage(parseInt(value))
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
          //value={1}
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
        title={isApprove ? "İzin Reddetme" : "İzin Onaylama"}
        question={
          isApprove
            ? "İzini Onaylamak İstediğinize Emin Misiniz"
            : "İzini Reddetmek İstediğinize Emin Misiniz"
        }
        btnColorSchema={isApprove ? "green" : "red"}
        btnText={isApprove ? "Onayla" : "Reddet"}
        deleteMethod={deletePermission}
      />
    )}
  </>
  );
}

export default Manager;
