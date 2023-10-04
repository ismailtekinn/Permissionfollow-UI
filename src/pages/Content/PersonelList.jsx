import React from "react";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPersonelList } from "../../api";

function PersonelList() {
  const { data } = useInfiniteQuery({
    queryKey: ["personel-list"],
    queryFn: fetchPersonelList,
  });
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
            {data &&
              data.pages[0].data.map((pageItem) => (
                <Tr key={pageItem.id}>
                  <Td>{pageItem.firstName}</Td>
                  <Td>{pageItem.lastName}</Td>
                  <Td>{pageItem.email}</Td>
                  <Td>{pageItem.birim}</Td>
                  <Td>{pageItem.roleName}</Td>
                  <Td>{pageItem.isDelete}</Td>
                  <Td>
                    {pageItem.isActive ? (
                      <CheckCircleIcon />
                    ) : (
                      <SmallCloseIcon />
                    )}
                  </Td>
                  <Td>{pageItem.createdAt}</Td>
                  <Td>
                    <Button colorScheme="teal" size="xs">
                      Güncelle
                    </Button>{" "}
                    <Button colorScheme="red" size="xs">
                      Sil
                    </Button>
                  </Td>
                </Tr>
              ))}
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
  );
}

export default PersonelList;
