import types from "./types";
import { Actions, ActionParameters } from "./interfaces";
import AnimalsService from "../../services/animals.service";
import Types from "./types";
import { Animals } from "@/interaces/animals";

export default {
  [types.actions.LOADANIMALS]: (
    core: Actions,
    params?: ActionParameters
  ): Promise<Array<Animals>> | null => {
    return new Promise((resolve, reject): void => {
      AnimalsService.getAnimals(params.category, params.order, 1)
        .then(data => {
          core.commit(Types.mutations.SETANIMALS, data);
          resolve(data.data);
        })
        .catch(e => reject(e));
    });
  },
  [Types.actions.LOADMORE]: (
    core: Actions,
    params?: ActionParameters
  ): Promise<Array<Animals>> | null => {
    return new Promise((resolve, reject): void => {
      AnimalsService.getAnimals(params.category, params.order, core.state.page)
        .then(data => {
          core.commit(Types.mutations.ADDANIMALES, data);
          resolve(data.data);
        })
        .catch(e => reject(e));
    });
  }
};
