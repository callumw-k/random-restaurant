import { randomInt } from "../../utils";
import PlaceResult = google.maps.places.PlaceResult;
import { flattenDistance, getDistance } from "../distance";
import TravelMode = google.maps.TravelMode;
import { Dispatch, SetStateAction } from "react";

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

const getNearbyPlace = async (keyword: string, lat: number, lng: number) => {
  const response = await fetch("/api/place/nearby-place", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword, lat, lng }),
  });
  const data = await response.json();
  return data.results;
};

export const getNearbyPlaces = async (
  mapId: string,
  keywords: string[] | undefined
): Promise<{
  originLat: number;
  originLng: number;
  places: (PlaceResult | null)[];
}> => {
  if (!mapId) {
    throw new Error("Need mapId");
  } else if (!keywords || !keywords.length) {
    throw new Error("Need valid keywords input");
  } else if (typeof window === "undefined") {
    throw new Error("Need valid window object");
  }
  const { originLat, originLng } = await getLatLngFromId(mapId);

  const places = await Promise.all(
    keywords.map((keyword) => getNearbyPlace(keyword, originLat, originLng))
  )
    .then((data) => {
      return data.flat();
    })
    .catch((e) => {
      throw new Error(e);
    });
  return {
    originLat,
    originLng,
    places,
  };
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
  keywords: string[] | undefined,
  travelMode: TravelMode,
  distance: string
): Promise<PlaceResult> => {
  try {
    let chosenDestination;
    const { originLat, originLng, places } = await getNearbyPlaces(
      mapId,
      keywords
    );
    while (!chosenDestination) {
      const randomDestination = places[randomInt(0, places.length - 1)];
      const destinationLatLng = randomDestination?.geometry?.location;
      const distanceFromOrigin = await getDistance(
        { lat: originLat, lng: originLng },
        destinationLatLng,
        travelMode
      );
      const flattenedDistance = flattenDistance(distanceFromOrigin);
      console.debug(flattenedDistance);
      if (
        flattenedDistance.durationValue &&
        flattenedDistance.durationValue < parseInt(distance) * 60
      ) {
        chosenDestination = randomDestination;
      }
    }
    return await getPlaceDetails(chosenDestination?.place_id);
  } catch (e) {
    throw new Error(`Could not get random destination: ${e}`);
  }
};
