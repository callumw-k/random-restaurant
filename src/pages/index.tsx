import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { FormState } from "../../types/form-types";
import DisplayRestaurant from "../components/DisplayRestaurant";
import { trpc } from "../utils/trpc";
import { GetPlaceDetailsResponse } from "../../types/api-response-types";
import { Button } from "@chakra-ui/react";
import { z } from "zod";
import { PlaceObject } from "../../types/placeTypes";

const Home: NextPage = () => {
  const [placeObject, setPlaceObject] = useState<PlaceObject | undefined>(
    undefined
  );

  const [formState, setFormState] = useState<FormState>({
    id: "",
    address: "",
    radius: "",
    keywords: "",
  });

  const { data, isLoading } = trpc.useQuery([
    "restaurants.getPlaceDetails",
    formState.id,
  ]);

  const getRandomRestaurants = () => {
    let pO;
    if (!isLoading && data?.result) {
      pO = {
        latitude: data.result.geometry.location.lat,
        longitude: data.result.geometry.location.lng,
      };
      setPlaceObject(pO);
    }
  };

  return (
    <>
      <AddressSearch formState={formState} setFormState={setFormState} />
      {/*<DisplayRestaurant placeObject={placeObject} />*/}
      <Button onClick={() => getRandomRestaurants()}>
        Click to generate restaurants
      </Button>
    </>
  );
};

export default Home;
