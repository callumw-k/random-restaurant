import { Heading, Link, Stack } from "@chakra-ui/react";
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
  console.debug(image);
  return (
    <Stack padding={4}>
      <Heading as="h1" size="md">
        {name}
      </Heading>
      <Link href={mapLink}>{mapLink}</Link>
      <Image src={image} width={500} height={500} />
    </Stack>
  );
};

export default PlaceCard;
