import { createLatLangObject } from "../places/utils";

export const getDistance = (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  travelMode: string
) =>
  new Promise((resolve, reject) => {
    try {
      new window.google.maps.DistanceMatrixService().getDistanceMatrix(
        {
          origins: [createLatLangObject(origin.lat, origin.lng)],
          destinations: [createLatLangObject(destination.lat, destination.lng)],
          travelMode: travelMode as any,
        },
        resolve
      );
    } catch (e) {
      reject(e);
    }
  });
