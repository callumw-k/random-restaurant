import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { FormState } from "../../../types/form-types";
import { MultiValue, Select } from "chakra-react-select";
import { listOfCuisines } from "../utils/cuisine";
import { SearchAddress } from "../SearchAddress";
import { getRandomDestination } from "../hooks/places";
import PlaceResult = google.maps.places.PlaceResult;
import { flattenDistance, getDistance } from "../hooks/distance";
import TravelMode = google.maps.TravelMode;

export const AddressSearch = ({
  formState,
  setFormState,
  setDestination,
}: {
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
  setDestination: Dispatch<SetStateAction<PlaceResult | undefined>>;
}) => {
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
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
    setFormLoading(true);
    try {
      const { placeDetails, originLng, originLat } = await getRandomDestination(
        formState.originId,
        formState.keywords
      );
      const distance = await getDistance(
        { lat: originLat, lng: originLng },
        {
          lat: placeDetails?.geometry?.location?.lat() || 0,
          lng: placeDetails?.geometry?.location?.lng() || 0,
        },
        formState.travelMode
      );
      const flattenedDistance = flattenDistance(distance);
      console.debug(flattenedDistance);
      if (
        flattenedDistance.durationValue &&
        flattenedDistance.durationValue > parseInt(formState.distance) * 60
      ) {
        setTimeout(async () => getRandomRestaurants(), 300);
      } else {
        setFormLoading(false);
        setDestination(placeDetails);
      }
    } catch (e) {
      console.debug(`${e}`);
      setError("Something went wrong. Please try again.");
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
          <HStack alignItems="top" spacing={4}>
            <FormControl>
              <FormLabel htmlFor="distance">Distance</FormLabel>
              <Input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="distance"
                value={formState.distance}
              />
              <FormHelperText>Distance (minutes).</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="travelMode">Travel Mode</FormLabel>
              <RadioGroup
                onChange={(e: TravelMode) =>
                  setFormState({ ...formState, travelMode: e })
                }
                value={formState.travelMode}
              >
                <Stack direction="row">
                  <Radio value="WALKING">Walking</Radio>
                  <Radio value="TRANSIT">Transit</Radio>
                  <Radio value="DRIVING">Driving</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </HStack>
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
          <HStack spacing={4}>
            <Button type="submit">Submit</Button>
            {formLoading && <Spinner />}
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};
