import { createLatLangObject } from "../places/utils";
import { DistanceResponse } from "../../../../types/distance-types";
import { DistanceMatrixResponse } from "@googlemaps/google-maps-services-js";

export const getDistance = (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  travelMode: string
) =>
  new Promise<DistanceMatrixResponse>((resolve, reject) => {
    try {
      new window.google.maps.DistanceMatrixService().getDistanceMatrix(
        {
          origins: [createLatLangObject(origin.lat, origin.lng)],
          destinations: [createLatLangObject(destination.lat, destination.lng)],
          travelMode: travelMode as any,
        },
        (response, status) => {
          if (status == "OK") {
            resolve(response as DistanceResponse);
          } else {
            reject(status);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });

export const flattenedDistance = (distanceObject: DistanceResponse) => {
  if (distanceObject.rows.length > 1) {
    throw new Error("Distance matrix should have only one row");
  }
  console.debug(distanceObject);
};
