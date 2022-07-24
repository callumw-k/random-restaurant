export type GetPlaceDetailsResponse = GetPlaceDetailsOk;

type GetPlaceDetailsOk = {
  html_attributions?: null[] | null;
  result: Result;
  status: "OK";
};

export interface Result {
  address_components?: AddressComponentsEntity[] | null;
  adr_address: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  place_id: string;
  plus_code: PlusCode;
  reference: string;
  types?: string[] | null;
  url: string;
  utc_offset: number;
  vicinity: string;
}
export interface AddressComponentsEntity {
  long_name: string;
  short_name: string;
  types?: string[] | null;
}
export interface Geometry {
  location: NortheastOrSouthwestOrLocation;
  viewport: Viewport;
}
export interface NortheastOrSouthwestOrLocation {
  lat: () => number;
  lng: () => number;
}
export interface Viewport {
  northeast: NortheastOrSouthwestOrLocation;
  southwest: NortheastOrSouthwestOrLocation;
}
export interface PlusCode {
  compound_code: string;
  global_code: string;
}
