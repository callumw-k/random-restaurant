import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { FormState } from "../../types/form-types";
import { Button, Heading } from "@chakra-ui/react";
import { PlaceObject } from "../../types/placeTypes";
import {
  getNearbyPlaces,
  getPlaceDetails,
} from "../components/hooks/placesHook";
import { Result } from "../../types/api-response-types";
import { getLatLng, randomInt } from "../components/utils";

const Home: NextPage = () => {
  const [chosenPlace, setChosenPlace] = useState(undefined);

  const [formState, setFormState] = useState<FormState>({
    id: "",
    address: "",
    radius: "",
    keywords: "",
  });

  const getRandomRestaurants = async () => {
    const { latitude, longitude } = await getLatLng(formState.id);
    const nearbyData = (await getNearbyPlaces(
      latitude,
      longitude,
      formState.radius,
      formState.keywords
    )) as [];
    console.debug(nearbyData);
    setChosenPlace(nearbyData[randomInt(0, nearbyData.length)]);
  };

  return (
    <>
      <AddressSearch
        onSubmit={getRandomRestaurants}
        formState={formState}
        setFormState={setFormState}
      />
      <Heading>{chosenPlace?.name || ""}</Heading>
    </>
  );
};

export default Home;
