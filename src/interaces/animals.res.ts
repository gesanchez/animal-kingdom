import { Animals } from "./animals";
export interface AnimalsResponse {
  count: number;
  page: number;
  data: Array<Animals>;
}