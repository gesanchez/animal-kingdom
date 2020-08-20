import types from "./types";
import { StateAnimals } from "./interfaces";
import { AnimalsResponse } from "@/interaces/animals.res";

export default {
  [types.mutations.SETANIMALS]: (state: StateAnimals, res: AnimalsResponse) => {
    state.animals = res.data;
    state.countTotal = res.count;
    state.page = res.page;
  },
  [types.mutations.ADDANIMALES]: (
    state: StateAnimals,
    res: AnimalsResponse
  ) => {
    state.animals = state.animals.concat(res.data);
    state.countTotal = res.count;
    state.page = res.page;
  }
};
