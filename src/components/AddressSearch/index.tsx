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
import { FormState, PlaceArray } from "../../../types/form-types";
import { googleAutocomplete } from "../hooks/placesHook";
import {
  AsyncSelect,
  MultiValue,
  Select,
  SingleValue,
} from "chakra-react-select";
import { listOfCuisines } from "../utils/cuisine";

const handleChange = async (string: string) => {
  if (string) {
    const results = (await googleAutocomplete(string)) as PlaceArray;
    return results?.map((result) => {
      return {
        label: `${result.structured_formatting.main_text}, ${result.structured_formatting.secondary_text}`,
        value: result.place_id,
      };
    });
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
      originId: newValue?.value || "",
    });
  };

  return (
    <Box>
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
              onChange={(
                newValue: MultiValue<{ label: string; value: string }>
              ): void => {
                console.debug(
                  newValue.some((value) => value.value === "any-cuisine")
                );
                if (newValue.some((value) => value.value === "any-cuisine")) {
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
                    keywords: newValue.map((item) => item.value),
                  });
                }
              }}
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
