import z from "zod";

const placeObject = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type PlaceObject = z.infer<typeof placeObject>;
