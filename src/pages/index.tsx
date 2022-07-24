import type { NextPage } from "next";
import React, { useState } from "react";
import { AddressSearch } from "../components/AddressSearch";
import { FormState } from "../../types/form-types";

const Home: NextPage = () => {
  const [placeObject, setPlaceObject] = useState<string>("");

  const [formState, setFormState] = useState<FormState>({
    address: "",
    radius: "",
    keywords: "",
  });

  console.debug(placeObject, formState);
  return (
    <>
      <AddressSearch
        formState={formState}
        setFormState={setFormState}
      />
      {/* <DisplayRestaurant placeObject={placeObject} /> */}
    </>
  );
};

export default Home;
