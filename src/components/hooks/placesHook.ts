import { splitAndJoinString } from "../utils";
import { throws } from "assert";

let fakeMap: HTMLDivElement;
if (typeof document !== "undefined") {
  fakeMap = document.createElement("div");
}

export const googleAutocomplete = async (text: string) =>
  new Promise((resolve, reject) => {
    if (!text) {
      return reject("Need valid text input");
    }

    // for use in things like GatsbyJS where the html is generated first
    if (typeof window === "undefined") {
      return reject("Need valid window object");
    }

    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        { input: text, componentRestrictions: { country: "au" } },
        resolve
      );
    } catch (e) {
      reject(e);
    }
  });

export const createUrl = (type: "PlaceDetails" | "NearbySearch"): string => {
  const baseUrl = "https://maps.googleapis.com/maps/api/place";
  switch (type) {
    case "PlaceDetails":
      return `${baseUrl}/details/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    case "NearbySearch":
      return `${baseUrl}/nearbysearch/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    default:
      return "";
  }
};

export const getPlaceDetails = async (id: string | undefined) =>
  await new Promise((resolve, reject) => {
    if (!id) {
      return reject("Need valid id input");
    }
    if (typeof window === "undefined") {
      return reject("Need valid window object");
    }
    try {
      new window.google.maps.places.PlacesService(fakeMap).getDetails(
        { placeId: id },
        (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });

const getNearbyPlace = (
  keyword: string,
  lat: number,
  lng: number,
  intRadius: number
) =>
  new Promise((resolve, reject) => {
    try {
      const latLangObj = new window.google.maps.LatLng(lat, lng);
      new window.google.maps.places.PlacesService(fakeMap).nearbySearch(
        { location: latLangObj, radius: intRadius, keyword },
        resolve
      );
    } catch (e) {
      reject(e);
    }
  });

export const getNearbyPlaces = async (
  lat: number,
  lng: number,
  radius: string,
  keywords: string[] | undefined
) => {
  const intRadius = parseInt(radius);
  console.debug(keywords);

  if (!lat || !lng) {
    return { status: "error", message: "Need valid lat and lng input" };
  } else if (!keywords || !keywords.length) {
    return { status: "error", message: "Please select keywords" };
  } else if (typeof window === "undefined") {
    return { status: "error", message: "Window not defined" };
  }

  return await Promise.all(
    keywords.map((keyword) => getNearbyPlace(keyword, lat, lng, intRadius))
  )
    .then((data) => {
      return { status: "OK", nearbyData: data.flat() };
    })
    .catch((e) => {
      return { status: "error", message: e };
    });
};
