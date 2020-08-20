import { Category } from "@/interaces/category";
import http from "@/tools/api";

class CategoriesService {
  /**
   * getCategories
   *
   * @description Method for return categories' list
   * from server
   */
  public getCategories(): Promise<Array<Category>> {
    return new Promise((resolve, reject) => {
      http
        .get("/categories")
        .then(res => resolve(res.data))
        .catch(e => reject(e));
    });
  }
}

export default new CategoriesService();
