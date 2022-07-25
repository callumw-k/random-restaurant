import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { FormState } from "../../types/form-types";
import { Heading, Container } from "@chakra-ui/react";
import {
  NearbySearchObject,
  NearbySearchResponse,
  PlaceDetailsObject,
} from "../../types/placeTypes";
import {
  getNearbyPlaces,
  getPlaceDetails,
} from "../components/hooks/placesHook";
import { getLatLng, randomInt } from "../components/utils";
import PlaceCard from "../components/PlaceCard";

const Home: NextPage = () => {
  const [chosenPlace, setChosenPlace] = useState<
    NearbySearchObject | undefined
  >(undefined);

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
    )) as NearbySearchResponse;
    const chosen = nearbyData[randomInt(0, nearbyData.length)];
    setChosenPlace(chosen);
    const placeDetails = (await getPlaceDetails(
      chosen?.place_id
    )) as PlaceDetailsObject;
    console.debug(placeDetails.url);
  };

  return (
    <Container maxW="xl">
      <AddressSearch
        onSubmit={getRandomRestaurants}
        formState={formState}
        setFormState={setFormState}
      />
    </Container>
  );
};

export default Home;
