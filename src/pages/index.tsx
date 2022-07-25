import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { FormState } from "../../types/form-types";
import { Container, Spinner } from "@chakra-ui/react";
import {
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
    PlaceDetailsObject | undefined
  >(undefined);
  const [loadingCard, setLoadingCard] = useState(true);

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
    const chosen = nearbyData[randomInt(0, nearbyData.length - 1)];
    const placeDetails = (await getPlaceDetails(
      chosen?.place_id
    )) as PlaceDetailsObject;
    setChosenPlace(placeDetails);
    setLoadingCard(false)
  };

  return (
    <Container maxW="xl">
      <AddressSearch
        onSubmit={getRandomRestaurants}
        formState={formState}
        setFormState={setFormState}
      />
      {loadingCard ? (
        <Spinner />
      ) : (
        <PlaceCard
          name={chosenPlace?.name || ""}
          image={chosenPlace?.photos?.[0]?.getUrl()}
          mapLink={chosenPlace?.url || ""}
        />
      )}
    </Container>
  );
};

export default Home;
