import { z } from "zod";

export const PlaceObject = z.object({
  place_id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  html_attributions: z.array(z.any()),
});

export type PlaceTypes = z.infer<typeof PlaceObject>;
