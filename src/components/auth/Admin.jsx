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
import React from "react";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";

function Admin() {
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
                <Th>Birim</Th>
                <Th>İzin Başlangıç Tarihi</Th>
                <Th>İzin Bitiş Tarihi</Th>
                <Th>İzin Onay Durumu</Th>
                <Th>#</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Ad 1</Td>
                <Td>Soyad 1</Td>
                <Td>Birim 1</Td>
                <Td>Başlangıç Tarihi 1</Td>
                <Td>Bitiş Tarihi 1</Td>
                <Td>
                  <CheckCircleIcon /> <SmallCloseIcon />
                </Td>
                <Td>
                  <Button colorScheme="teal" size="xs">
                    Onayla
                  </Button>{" "}
                  <Button colorScheme="red" size="xs">
                    Reddet
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Ad 1</Td>
                <Td>Soyad 1</Td>
                <Td>Birim 1</Td>
                <Td>Başlangıç Tarihi 1</Td>
                <Td>Bitiş Tarihi 1</Td>
                <Td>
                  <CheckCircleIcon /> <SmallCloseIcon />
                </Td>
                <Td>
                  <Button colorScheme="teal" size="xs">
                    Onayla
                  </Button>{" "}
                  <Button colorScheme="red" size="xs">
                    Reddet
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Ad 1</Td>
                <Td>Soyad 1</Td>
                <Td>Birim 1</Td>
                <Td>Başlangıç Tarihi 1</Td>
                <Td>Bitiş Tarihi 1</Td>
                <Td>
                  <CheckCircleIcon /> <SmallCloseIcon />
                </Td>
                <Td>
                  <Button colorScheme="teal" size="xs">
                    Onayla
                  </Button>{" "}
                  <Button colorScheme="red" size="xs">
                    Reddet
                  </Button>
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
    </>
  );
}

export default Admin;
