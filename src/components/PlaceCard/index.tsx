import { Box, Heading, Link, Stack } from "@chakra-ui/react";
import Image from "next/future/image";
import React from "react";
const PlaceCard = ({
  name,
  image,
  mapLink,
}: {
  name: string;
  image: string;
  mapLink: string | undefined;
}) => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      mt={{ base: 12, md: 16 }}
      boxShadow="lg"
      // borderColor="grey.200"
      // borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box
        flex="0 1 50%"
        width="100%"
        height={{ base: "250px", md: "150px" }}
        overflow="hidden"
      >
        <Image
          src={image}
          width={1000}
          height={1000}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "inherit",
          }}
          alt={name}
        />
      </Box>
      <Stack padding={{ base: 8, md: 4 }} justifyContent="center">
        <Heading as="h1" size="md">
          {name}
        </Heading>
        <Link target="_blank" href={mapLink}>
          {mapLink}
        </Link>
      </Stack>
    </Stack>
  );
};

export default PlaceCard;
