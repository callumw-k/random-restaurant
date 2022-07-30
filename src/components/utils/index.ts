import { Result } from "../../../types/api-response-types";
import { getPlaceDetails } from "../hooks/places";

export const splitAndJoinString = (string: string) => {
  return string.split(" ").join("");
};

export const getLatLng = async (mapsId: string) => {
  const placeData = (await getPlaceDetails(mapsId)) as Result;
  return {
    originLat: placeData?.geometry.location.lat(),
    originLng: placeData?.geometry.location.lng(),
  };
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
