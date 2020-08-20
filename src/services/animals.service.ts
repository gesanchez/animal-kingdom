import { Animals } from "../interaces/animals";
import { AnimalsParamsReq } from "../interaces/animals-params.req";
import { AnimalsResponse } from "../interaces/animals.res";
import http from "@/tools/api";

class AnimalsService {
  /**
   * getRandom
   *
   * @description Method for return a random animal
   * from server
   */
  public getRandom(): Promise<Animals> {
    return new Promise((resolve, reject) => {
      http
        .get("/random")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    });
  }

  /**
   * getDetail
   *
   * @description Method for return a animal's detail
   * from server
   * @param id - Id's animal
   */
  public getDetail(id: number): Promise<Animals> {
    return new Promise((resolve, reject) => {
      http
        .get(`/animals/${id}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    });
  }

  /**
   * getRelated
   *
   * @description Method for return animals related
   * to the detail
   * @param id - Id's animal
   */
  public getRelated(id: number): Promise<Array<Animals>> {
    return new Promise((resolve, reject) => {
      http
        .get(`/animals/related/${id}`)
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    });
  }

  /**
   * getAnimals
   *
   * @description Method for return a list of animals
   * from server
   * @param id - Id's animal
   */
  public getAnimals(
    category?: string,
    order?: string,
    page = 1,
    limit = 10
  ): Promise<AnimalsResponse> {
    const params: AnimalsParamsReq = {
      limit: limit,
      page: page
    };
    if (category) {
      params["category"] = category;
    }
    if (order) {
      params["order"] = order;
    }
    return new Promise((resolve, reject) => {
      http
        .get(`/animals`, { params: params })
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    });
  }
}

export default new AnimalsService();
