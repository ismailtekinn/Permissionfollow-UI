import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import React from "react";

function CardItem({text, count}) {
    return (
      <Card w="100%" h="100px">
        <CardHeader
          size="md"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          {text}
        </CardHeader>
        <CardBody>
          <Text
            fontSize="2xl"
            bgGradient="linear(to-l, red, black)"
            bgClip="text"
            fontWeight="extrabold"
          >
            {count}
          </Text>
        </CardBody>
      </Card>
    );
  }
  
  export default CardItem;