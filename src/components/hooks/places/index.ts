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

const getNearbyPlace = async (keyword: string, lat: number, lng: number) => {
  const response = await fetch("/api/place/nearby-place", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword, lat, lng }),
  });
  const data = await response.json();
  return data.results;
};

export const getNearbyPlaces = (
  lat: number,
  lng: number,
  keywords: string[] | undefined
): Promise<(PlaceResult | null)[]> => {
  if (!lat || !lng) {
    throw new Error("Need valid lat and lng input");
  } else if (!keywords || !keywords.length) {
    throw new Error("Need valid keywords input");
  } else if (typeof window === "undefined") {
    throw new Error("Need valid window object");
  }

  return Promise.all(
    keywords.map((keyword) => getNearbyPlace(keyword, lat, lng))
  )
    .then((data) => {
      return data.flat();
    })
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
  keywords: string[] | undefined
): Promise<{
  placeDetails: PlaceResult;
  originLat: number;
  originLng: number;
}> => {
  try {
    const { originLat, originLng } = await getLatLngFromId(mapId);
    const nearbyPlaceData = await getNearbyPlaces(
      originLat,
      originLng,
      keywords
    );
    const randomDestination =
      nearbyPlaceData[randomInt(0, nearbyPlaceData.length - 1)];
    const placeDetails = await getPlaceDetails(randomDestination?.place_id);
    return {
      placeDetails,
      originLat,
      originLng,
    };
  } catch (e) {
    throw new Error(`Could not get random destination: ${e}`);
  }
};
