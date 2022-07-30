export type NearbySearchResponse =
  | { status: "OK"; nearbyData: NearbySearchObject[] }
  | { status: "error"; message: string };

export interface NearbySearchObject {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level?: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
  html_attributions: any[];
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: () => number;
  lng: () => number;
}

export interface Viewport {
  vb: Vb;
  Ra: Ra;
}

export interface Vb {
  lo: number;
  hi: number;
}

export interface Ra {
  lo: number;
  hi: number;
}

export interface OpeningHours {}

export interface Photo {
  height: number;
  html_attributions: string[];
  width: number;
  getUrl: () => string;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface PlaceDetailsObject {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  reviews: Review[];
  types: string[];
  url: string;
  user_ratings_total: number;
  vicinity: string;
  website: string;
  html_attributions: any[];
  utc_offset_minutes: number;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {}

export interface Viewport {
  vb: Vb;
  Ra: Ra;
}

export interface Vb {
  lo: number;
  hi: number;
}

export interface Ra {
  lo: number;
  hi: number;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}
