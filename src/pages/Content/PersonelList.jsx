import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Tbody,
  Table,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Button,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Flex,
  Text,
  Tooltip,
  Card,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { fetchPersonelList } from "../../api";

function PersonelList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [personelList, setPersonelList] = useState([]);
  console.log("page :", page);

  useEffect(() => {
    (async () => {
      const _personelList = await fetchPersonelList(page, limit);
      setPersonelList(_personelList.data);
    })();
  }, [page, limit]);

  return (
    <Card m={5}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Ad</Th>
              <Th>Soyad</Th>
              <Th>Email</Th>
              <Th>Birim</Th>
              <Th>Role</Th>
              <Th>Silindi Mi ?</Th>
              <Th>Aktif Mi ?</Th>
              <Th>Oluşturma Tarihi</Th>
              <Th>#</Th>
            </Tr>
          </Thead>
          <Tbody>
            {personelList.length !== 0 ? (
              personelList.map((personel) => (
                <Tr key={personel.id}>
                  <Td>{personel.firstName}</Td>
                  <Td>{personel.lastName}</Td>
                  <Td>{personel.email}</Td>
                  <Td>{personel.birim}</Td>
                  <Td>{personel.roleName}</Td>
                  <Td>{personel.isDelete}</Td>
                  <Td>
                    {personel.isActive ? (
                      <CheckCircleIcon />
                    ) : (
                      <SmallCloseIcon />
                    )}
                  </Td>
                  <Td>{personel.createdAt}</Td>
                  <Td>
                    <Button colorScheme="teal" size="xs">
                      Güncelle
                    </Button>{" "}
                    <Button colorScheme="red" size="xs">
                      Sil
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
              {pageSize}
            </option>
          ))}
        </Select>
        <Tooltip label="Next Page">
          <IconButton
            onClick={() => setPage(page + 1)}
            isDisabled={personelList.length < limit}
            ml={4}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
      </Flex>
    </Card>
  );
}

export default PersonelList;
