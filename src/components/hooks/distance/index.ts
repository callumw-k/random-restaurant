import DistanceMatrixResponse = google.maps.DistanceMatrixResponse;
import TravelMode = google.maps.TravelMode;
import LatLng = google.maps.LatLng;

export const getDistance = (
  origin: { lat: number; lng: number },
  destination: LatLng | undefined,
  travelMode: TravelMode
) => {
  if (!destination) {
    throw new Error("Need valid origin and destination");
  }
  return new Promise<DistanceMatrixResponse>((resolve, reject) => {
    try {
      new window.google.maps.DistanceMatrixService().getDistanceMatrix(
        {
          origins: [new window.google.maps.LatLng(origin.lat, origin.lng)],
          destinations: [
            new window.google.maps.LatLng(
              destination.lat as unknown as number,
              destination.lng as unknown as number
            ),
          ],
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
};

export const flattenDistance = (distanceObject: DistanceMatrixResponse) => {
  if (distanceObject.rows.length > 1) {
    throw new Error("Distance matrix should have only one row");
  }
  return {
    durationText: distanceObject?.rows?.[0]?.elements?.[0]?.duration.text,
    durationValue: distanceObject?.rows?.[0]?.elements?.[0]?.duration.value,
  };
};
