import { createLatLangObject } from "./utils";
import { randomInt } from "../../utils";
import PlaceResult = google.maps.places.PlaceResult;

let fakeMap: HTMLDivElement;
if (typeof document !== "undefined") {
  fakeMap = document.createElement("div");
}

export const getPlaceDetails = async (id: string | undefined) =>
  await new Promise<PlaceResult>((resolve, reject) => {
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
            resolve(place as PlaceResult);
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
  new Promise<PlaceResult[] | null>((resolve, reject) => {
    try {
      const latLangObj = createLatLangObject(lat, lng);
      new window.google.maps.places.PlacesService(fakeMap).nearbySearch(
        { location: latLangObj, radius: intRadius, keyword },
        (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          } else {
            reject(status);
          }
        }
      );
    } catch (e) {
      return reject(e);
    }
  });

export const getNearbyPlaces = (
  lat: number,
  lng: number,
  radius: string,
  keywords: string[] | undefined
): Promise<(PlaceResult | null)[]> => {
  const intRadius = parseInt(radius);

  if (!lat || !lng) {
    throw new Error("Need valid lat and lng input");
  } else if (!keywords || !keywords.length) {
    throw new Error("Need valid keywords input");
  } else if (typeof window === "undefined") {
    throw new Error("Need valid window object");
  }

  return Promise.all(
    keywords.map((keyword) => getNearbyPlace(keyword, lat, lng, intRadius))
  )
    .then((data) => data.flat())
    .catch((e) => {
      throw new Error(e);
    });
};

export const getLatLngFromId = async (mapsId: string) => {
  const placeData = await getPlaceDetails(mapsId);
  if (!placeData.geometry?.location) {
    throw new Error("Could not get place data");
  }
  return {
    originLat: placeData?.geometry?.location.lat(),
    originLng: placeData?.geometry?.location.lng(),
  };
};

export const getRandomDestination = async (
  mapId: string,
  radius: string,
  keywords: string[] | undefined
): Promise<PlaceResult> => {
  try {
    const { originLat, originLng } = await getLatLngFromId(mapId);
    const nearbyPlaceData = await getNearbyPlaces(
      originLat,
      originLng,
      radius,
      keywords
    );
    const randomDestination =
      nearbyPlaceData[randomInt(0, nearbyPlaceData.length - 1)];
    return await getPlaceDetails(randomDestination?.place_id);
  } catch (e) {
    throw new Error(`Get Random Restaurant error: ${e}`);
  }
};
