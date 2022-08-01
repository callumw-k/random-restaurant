import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { AsyncSelect, SingleValue } from "chakra-react-select";
import React, { Dispatch, SetStateAction } from "react";
import { googleAutocomplete } from "../hooks/autoComplete";
import { FormState, PlaceArray } from "../../../types/form-types";

export const SearchAddress = ({
  formState,
  setFormState,
}: {
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
}) => {
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
    <FormControl>
      <FormLabel htmlFor="address">Address</FormLabel>
      <AsyncSelect
        className="Autocomplete"
        useBasicStyles
        name="address"
        onChange={(newValue: SingleValue<{ label: string; value: string }>) => {
          handleReactSelect(newValue);
        }}
        loadOptions={async (inputValue) => {
          return await handleChange(inputValue);
        }}
      />
      <FormHelperText pos="relative">Input your address.</FormHelperText>
    </FormControl>
  );
};
