import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { FormState } from "../../types/form-types";
import { Container } from "@chakra-ui/react";
import {
  NearbySearchResponse,
  PlaceDetailsObject,
} from "../../types/placeTypes";
import {
  getDistance,
  getNearbyPlaces,
  getPlaceDetails,
} from "../components/hooks/placesHook";
import { getLatLng, randomInt } from "../components/utils";
import PlaceCard from "../components/PlaceCard";

const Home: NextPage = () => {
  const [chosenPlace, setChosenPlace] = useState<
    PlaceDetailsObject | undefined
  >(undefined);

  const [formState, setFormState] = useState<FormState>({
    originId: "",
    address: "",
    radius: "",
    keywords: undefined,
  });

  const getRandomRestaurants = async () => {
    const { originLat, originLng } = await getLatLng(formState.originId);
    const nearbyDataResponse = (await getNearbyPlaces(
      originLat,
      originLng,
      formState.radius,
      formState.keywords
    )) as NearbySearchResponse;
    if (nearbyDataResponse.status === "OK") {
      const { nearbyData } = nearbyDataResponse;
      const chosen = nearbyData[randomInt(0, nearbyData.length - 1)];
      const distance = await getDistance(
        { lat: originLat, lng: originLng },
        {
          lat: chosen?.geometry.location.lat() || 0,
          lng: chosen?.geometry.location.lng() || 0,
        },
        "WALKING"
      );
      console.debug(distance);
      const placeDetails = (await getPlaceDetails(
        chosen?.place_id
      )) as PlaceDetailsObject;
      setChosenPlace(placeDetails);
    } else {
      console.debug(nearbyDataResponse.message);
    }
  };

  return (
    <Container maxW="xl">
      <AddressSearch
        onSubmit={getRandomRestaurants}
        formState={formState}
        setFormState={setFormState}
      />
      {chosenPlace && (
        <PlaceCard
          name={chosenPlace?.name || ""}
          image={chosenPlace?.photos?.[0]?.getUrl() || ""}
          mapLink={chosenPlace?.url || ""}
        />
      )}
    </Container>
  );
};

export default Home;
