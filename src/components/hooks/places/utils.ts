import LatLng = google.maps.LatLng;

export const createLatLangObject = (lat: number, lng: number) =>
  new window.google.maps.LatLng(lat, lng);
