import React, { Dispatch, SetStateAction } from "react";
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
import { FormState, PlaceArray } from "../../../types/form-types";
import { googleAutocomplete } from "../hooks/placesHook";
import { AsyncSelect, SingleValue } from "chakra-react-select";

const handleChange = async (string: string) => {
  if (string) {
    const results = (await googleAutocomplete(string)) as PlaceArray;
    const parsedResults = results?.map((result) => {
      return {
        label: `${result.structured_formatting.main_text}, ${result.structured_formatting.secondary_text}`,
        value: result.place_id,
      };
    });
    return parsedResults;
  } else {
    return [{ label: "", value: "" }];
  }
};

export const AddressSearch = ({
  formState,
  setFormState,
  onSubmit,
}: {
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
  onSubmit: () => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleReactSelect = (
    newValue: SingleValue<{ label: string; value: string }>
  ) => {
    setFormState({
      ...formState,
      address: newValue?.label || "",
      id: newValue?.value || "",
    });
  };

  return (
    <Box maxW="xl" margin="0 auto">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <VStack alignItems="flex-start" spacing={4}>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <AsyncSelect
              className="Autocomplete"
              useBasicStyles
              name="address"
              onChange={(
                newValue: SingleValue<{ label: string; value: string }>
              ) => {
                handleReactSelect(newValue);
              }}
              loadOptions={async (inputValue) => {
                return await handleChange(inputValue);
              }}
            />
            <FormHelperText pos="relative">Input your address.</FormHelperText>
          </FormControl>
          <HStack alignItems="flex-start">
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
              <Input
                type="string"
                value={formState.keywords}
                onChange={(e) => handleInputChange(e)}
                name="keywords"
              />
              <FormHelperText>
                Keywords to search for, i.e. indian, restaurant
              </FormHelperText>
            </FormControl>
          </HStack>
          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </Box>
  );
};
