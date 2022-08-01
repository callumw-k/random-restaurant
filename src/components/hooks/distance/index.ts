import { createLatLangObject } from "../places/utils";
import DistanceMatrixResponse = google.maps.DistanceMatrixResponse;
import TravelMode = google.maps.TravelMode;

export const getDistance = (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  travelMode: TravelMode
) =>
  new Promise<DistanceMatrixResponse>((resolve, reject) => {
    try {
      new window.google.maps.DistanceMatrixService().getDistanceMatrix(
        {
          origins: [createLatLangObject(origin.lat, origin.lng)],
          destinations: [createLatLangObject(destination.lat, destination.lng)],
          travelMode: travelMode,
        },
        (response, status) => {
          if (response && status == "OK") {
            resolve(response);
          } else {
            reject(status);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });

export const flattenDistance = (distanceObject: DistanceMatrixResponse) => {
  if (distanceObject.rows.length > 1) {
    throw new Error("Distance matrix should have only one row");
  }
  return {
    durationText: distanceObject?.rows?.[0]?.elements?.[0]?.duration.text,
    durationValue: distanceObject?.rows?.[0]?.elements?.[0]?.duration.value,
  };
};
