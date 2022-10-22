import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { FormState } from "../../types/form-types";
import { Container } from "@chakra-ui/react";
import PlaceCard from "../components/PlaceCard";
import PlaceResult = google.maps.places.PlaceResult;

const Home: NextPage = () => {
  const [destination, setDestination] = useState<PlaceResult | undefined>(
    undefined
  );

  const [formState, setFormState] = useState<FormState>({
    originId: "",
    address: "",
    distance: "",
    keywords: undefined,
    // @ts-ignore
    travelMode: "WALKING",
  });
  console.debug(destination?.reviews);

  return (
    <Container maxW="xl" paddingTop={24}>
      <AddressSearch
        setDestination={setDestination}
        formState={formState}
        setFormState={setFormState}
      />
      {destination && (
        <PlaceCard
          name={destination?.name || ""}
          image={destination?.photos?.[0]?.getUrl() || ""}
          mapLink={destination?.url || ""}
          rating={destination?.rating || ""}
        />
      )}
    </Container>
  );
};

export default Home;
