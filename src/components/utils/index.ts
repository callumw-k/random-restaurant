import { getPlaceDetails } from "../hooks/placesHook";
import { Result } from "../../../types/api-response-types";

export const splitAndJoinString = (string: string) => {
  return string.split(" ").join("");
};

export const getLatLng = async (mapsId: string) => {
  const placeData = (await getPlaceDetails(mapsId)) as Result;
  return {
    latitude: placeData?.geometry.location.lat(),
    longitude: placeData?.geometry.location.lng(),
  };
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
