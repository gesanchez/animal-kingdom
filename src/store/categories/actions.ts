import types from "./types";
import { Actions } from "./interfaces";
import CategoriesService from "../../services/categories.service";
import Types from "./types";
import { Category } from "@/interaces/category";

export default {
  [types.actions.LOADCATEGORIES]: (
    core: Actions
  ): Promise<Array<Category>> | null => {
    return new Promise((resolve, reject): void => {
      if (core.state.categories.length > 0) {
        resolve(core.state.categories);
      }

      CategoriesService.getCategories()
        .then(data => {
          core.commit(Types.mutations.SETCATEGORIES, data);
          resolve(data);
        })
        .catch(e => reject(e));
    });
  }
};
