import { z } from "zod";
import { createRouter } from "./context";
import { GetPlaceDetailsResponse } from "../../../types/api-response-types";
import { createUrl } from "../../components/hooks/placesHook";

export const restaurantRouter = createRouter()
  .query("get", {
    input: z.object({
      latitude: z.string(),
      longitude: z.string(),
    }),
    async resolve({ input }) {
      const location = encodeURIComponent(
        input.latitude + "," + input.longitude
      );
      const getTest = async () => {
        const data = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&keyword=indian&&type=restaurant&key=${process.env.GOOGLE_MAPS_API_KEY}&location=${location}`
        );
        return await data.json();
      };

      const data = await getTest();
      return { ...data };
    },
  })
  .query("getPlaceDetails", {
    input: z.string(),
    async resolve({ input }) {
      if (input) {
        console.debug("I've actually been called");
        const data = await fetch(
          `${createUrl("PlaceDetails")}&place_id=${input}`
        );
        return (await data.json()) as GetPlaceDetailsResponse;
      }
    },
  });
