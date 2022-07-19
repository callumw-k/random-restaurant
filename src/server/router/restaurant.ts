import { createRouter } from "./context";
import { PlaceObject } from "../../../types/placeTypes";

export const exampleRouter = createRouter().query("get", {
  input: PlaceObject,
  async resolve({ input }) {
    const location = encodeURIComponent(input.latitude + "," + input.longitude);
    const getTest = async () => {
      const data = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&keyword=indian&&type=restaurant&key=AIzaSyBYRCIjM6_t12uEOftrGtyN9FBJbpT8hEo&location=${location}`
      );
      return await data.json();
    };

    const data = await getTest();
    return { ...data };
  },
});
