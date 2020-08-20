import types from "./types";
import { StateAnimals } from "./interfaces";
import { Animals } from "@/interaces/animals";

export default {
  [types.getters.GETANIMALS]: (state: StateAnimals): Array<Animals> => {
    return state.animals;
  },
  [types.getters.LOADMORE]: (state: StateAnimals): boolean => {
    const count = state.countTotal || 0;
    return state.animals.length < count;
  }
};
