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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDayoffPersonelList, fetchMainInformation,  } from "../../api";
import CardItem from "./CardItem";
import moment from "moment";

function Admin() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [dayoffPersonelLists, setDayOffPersonel] = useState([]);
  const { status, data, error } = useInfiniteQuery({
    queryKey: ["main-information"],
    queryFn: fetchMainInformation,
  });

  useEffect(() => {
    (async () => {
      const _dayoffPersonelLists = await fetchDayoffPersonelList(page, limit);
      console.log(_dayoffPersonelLists.data[0]);
      setDayOffPersonel(_dayoffPersonelLists.data);
      

    
    })();
  },[page,limit]);

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
                <Th>Birim</Th>
                <Th>İzin Başlangıç Tarihi</Th>
                <Th>İzin Bitiş Tarihi</Th>
                <Th>İzin Onay Durumu</Th>
                <Th>#</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dayoffPersonelLists.length !== 0 ? (
                 dayoffPersonelLists.map((dayofPersonel)=> (
                  <Tr key={dayofPersonel.id}>
                    <Td>{dayofPersonel.name}</Td>
                    <Td>{dayofPersonel.surname}</Td>
                    <Td>{dayofPersonel.dayoffTypeName}</Td>
                    <Td>
                      {moment(dayofPersonel.start_Date).format("DD/MM/YYYY")}
                      </Td>
                    <Td>{moment(dayofPersonel.end_Date).format("DD/MM/YYYY")}</Td>
                    <Td>
                      {dayofPersonel.isApprove ? (
                        <CheckCircleIcon color="green.500" />
                      ) : (
                        <SmallCloseIcon color="red.500" />
                      )}
                    </Td>
                    <Td></Td>
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
              onClick={() => setPage(page - 1)}
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
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
          <Tooltip label="Next Page">
            <IconButton
              onClick={() => setPage(page + 1)}
              isDisabled={dayoffPersonelLists.length < limit}
              ml={4}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Card>
    </>
  );
}

export default Admin;
