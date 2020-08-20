import types from "./types";
import { StateCategories } from "./interfaces";
import { Category } from "@/interaces/category";

export default {
  [types.mutations.SETCATEGORIES]: (
    state: StateCategories,
    categories: Array<Category>
  ) => {
    state.categories = categories;
  }
};
