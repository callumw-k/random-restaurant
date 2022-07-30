import { createLatLangObject } from "./utils";

let fakeMap: HTMLDivElement;
if (typeof document !== "undefined") {
  fakeMap = document.createElement("div");
}

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
      const latLangObj = createLatLangObject(lat, lng);
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
