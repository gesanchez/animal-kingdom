import types from "./types";
import { StateCategories } from "./interfaces";

export default {
  [types.getters.GETCATEGORIES]: (state: StateCategories) => {
    return state.categories;
  }
};
