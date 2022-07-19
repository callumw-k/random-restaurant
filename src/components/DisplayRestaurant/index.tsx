import { trpc } from "../../utils/trpc";
import { PlaceTypes } from "../../../types/placeTypes";

const DisplayRestaurant = ({ placeObject }: { placeObject: PlaceTypes }) => {
  const hello = trpc.useQuery(["restaurants.get", placeObject]);

  return <div>{JSON.stringify(hello)}</div>;
};

export default DisplayRestaurant;
