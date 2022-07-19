import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { PlaceTypes } from "../../types/placeTypes";
import { FormState } from "../../types/form-types";

const Home: NextPage = () => {
  const [placeObject, setPlaceObject] = useState<PlaceTypes>({
    latitude: 0,
    longitude: 0,
    html_attributions: [],
    place_id: "",
  });

  const [formState, setFormState] = useState<FormState>({
    address: "",
    radius: "",
    keywords: "",
  });

  console.debug(formState)
  return (
    <>
      <AddressSearch
        formState={formState}
        setFormState={setFormState}
        setPlaceObject={setPlaceObject}
      />
      {/* <DisplayRestaurant placeObject={placeObject} /> */}
    </>
  );
};

export default Home;
