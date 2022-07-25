import z from "zod";

const placeObject = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type PlaceObject = z.infer<typeof placeObject>;

export type NearbySearchResponse = NearbySearchObject[];

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

export interface OpeningHours {}

export interface Photo {
  height: number;
  html_attributions: string[];
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}
