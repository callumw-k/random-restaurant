import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { PlaceTypes } from "../../../types/placeTypes";
import { FormState } from "../../../types/form-types";

interface CustomAutoCompleteProps extends google.maps.places.Autocomplete {}

export const AddressSearch = ({
  setPlaceObject,
  formState,
  setFormState,
}: {
  setPlaceObject: Dispatch<SetStateAction<PlaceTypes>>;
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
}) => {
  const [autoCompleteService, setAutoCompleteService] = useState<
    CustomAutoCompleteProps | undefined
  >(undefined);
  const searchInput = useRef(null);
  const { address, radius, keywords } = formState;

  const init = () => {
    if (typeof window?.google !== "undefined") {
      setAutoCompleteService(
        new window.google.maps.places.Autocomplete(
          searchInput.current as unknown as HTMLInputElement
        )
      );
    }
  };

  const createAutocomplete = () => {
    autoCompleteService?.setFields([
      "place_id",
      "geometry",
      "formatted_address",
    ]);
    autoCompleteService?.addListener("place_changed", () => getPlaceId());
    console.debug(autoCompleteService);
  };

  const getPlaceId = () => {
    const addressObject = autoCompleteService?.getPlace();
    if (addressObject) {
      if (addressObject.formatted_address) {
        setFormState({
          ...formState,
          address: addressObject.formatted_address,
        });
      }
      setPlaceObject({
        ...addressObject,
        latitude: addressObject?.geometry?.location?.lat(),
        longitude: addressObject?.geometry?.location?.lng(),
      } as PlaceTypes);
    }
  };

  const HandleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!autoCompleteService) {
      init();
    }
    if (!autoCompleteService?.fields) {
      createAutocomplete();
    }
  }, [autoCompleteService, formState]);

  console.debug(autoCompleteService);

  return (
    <Box maxW="xl" margin="0 auto">
      <form>
        <VStack alignItems="flex-start" spacing={4}>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              ref={searchInput}
              id="autocomplete"
              type="address"
              className="Autocomplete"
              name="address"
              value={address}
              onChange={(e) => HandleFormChange(e)}
            />
            <FormHelperText>Input your address.</FormHelperText>
          </FormControl>
          <HStack alignItems="flex-start">
            <FormControl>
              <FormLabel htmlFor="radius">Radius</FormLabel>
              <Input
                onChange={(e) => HandleFormChange(e)}
                type="number"
                name="radius"
              />
              <FormHelperText>Radius (in metres).</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="keywords">Keywords</FormLabel>
              <Input
                type="string"
                onChange={(e) => HandleFormChange(e)}
                name="keywords"
              />
              <FormHelperText>
                Keywords to search for, i.e. indian, restaurant
              </FormHelperText>
            </FormControl>
          </HStack>
          <Button>Submit</Button>
        </VStack>
      </form>
    </Box>
  );
};
