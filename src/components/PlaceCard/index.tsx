import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
const PlaceCard = ({
  name,
  image,
  mapLink,
}: {
  name: string;
  image: string;
  mapLink: string;
}) => {
  return (
    <Stack padding={4}>
      <Heading as="h1" size="md">
        {name}
      </Heading>
    </Stack>
  );
};

export default PlaceCard;
