import { splitAndJoinString } from "../utils";

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

const placeFetch = async (url: string) => {
  try {
    const data = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return await data.json();
  } catch (e) {
    throw e;
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

export const getNearbyPlaces = async (
  lat: number,
  lng: number,
  radius: string,
  keywords: string
) => {
  const intRadius = parseInt(radius);
  const keyword = encodeURIComponent(splitAndJoinString(keywords));
  console.debug(keyword);
  return await new Promise((resolve, reject) => {
    if (!lat || !lng) {
      return reject("Need valid lat and lng input");
    }
    if (typeof window === "undefined") {
      return reject("Need valid window object");
    }
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
};
