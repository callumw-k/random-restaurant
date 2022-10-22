import { Box, Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/future/image";
import React from "react";
interface PlaceCardProps {
  name: string;
  image: string;
  mapLink: string | undefined;
  rating: string | number;
}
const PlaceCard = ({ name, image, mapLink, rating }: PlaceCardProps) => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      mt={{ base: 12, md: 16 }}
      boxShadow="lg"
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
          width={500}
          height={500}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
          }}
          alt={name}
        />
      </Box>
      <Stack padding={{ base: 8, md: 4 }} spacing={4} justifyContent="center">
        <Link href={mapLink}>
          <Heading as="h1" size="md">
            {name}
          </Heading>
        </Link>
        <Text>
          <strong>{rating}</strong> stars
        </Text>
        <Button
          target="_blank"
          backgroundColor="green.300"
          color="whiteAlpha.900"
          as="a"
          href={mapLink}
          maxW="80px"
        >
          Go
        </Button>
      </Stack>
    </Stack>
  );
};

export default PlaceCard;
