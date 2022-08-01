import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormState } from "../../../types/form-types";
import { MultiValue, Select } from "chakra-react-select";
import { listOfCuisines } from "../utils/cuisine";
import { SearchAddress } from "../SearchAddress";
import { getRandomDestination } from "../hooks/places";
import PlaceResult = google.maps.places.PlaceResult;
import { flattenDistance, getDistance } from "../hooks/distance";

export const AddressSearch = ({
  formState,
  setFormState,
  setDestination,
}: {
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
  setDestination: Dispatch<SetStateAction<PlaceResult | undefined>>;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleKeywords = (
    keyWordArray: MultiValue<{ label: string; value: string }>
  ): void => {
    if (keyWordArray.some((value) => value.value === "any-cuisine")) {
      const listOfValues = listOfCuisines
        .map((cuisine) => cuisine.value)
        .filter((value) => value !== "any-cuisine");
      setFormState({
        ...formState,
        keywords: listOfValues,
      });
    } else {
      setFormState({
        ...formState,
        keywords: keyWordArray.map((item) => item.value),
      });
    }
  };

  const getRandomRestaurants = async () => {
    try {
      const { placeDetails, originLng, originLat } = await getRandomDestination(
        formState.originId,
        formState.radius,
        formState.keywords
      );
      const distance = await getDistance(
        { lat: originLat, lng: originLng },
        {
          lat: placeDetails?.geometry?.location?.lat() || 0,
          lng: placeDetails?.geometry?.location?.lng() || 0,
        },
        "WALKING"
      );
      const flattenedDistance = flattenDistance(distance);
      if (
        flattenedDistance.durationValue &&
        flattenedDistance.durationValue > 600
      ) {
        setTimeout(async () => getRandomRestaurants(), 300);
      } else {
        setDestination(placeDetails);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await getRandomRestaurants();
        }}
      >
        <VStack alignItems="flex-start" spacing={4}>
          <SearchAddress formState={formState} setFormState={setFormState} />
          <FormControl>
            <FormLabel htmlFor="radius">Radius</FormLabel>
            <Input
              onChange={(e) => handleInputChange(e)}
              type="number"
              name="radius"
              value={formState.radius}
            />
            <FormHelperText>Radius (in metres).</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="keywords">Keywords</FormLabel>
            <Select
              useBasicStyles
              isMulti
              onChange={(keyWordArray) => handleKeywords(keyWordArray)}
              name="keywords"
              options={listOfCuisines}
            />
            <FormHelperText>
              Keywords to search for, i.e. indian, restaurant
            </FormHelperText>
          </FormControl>
          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </Box>
  );
};
