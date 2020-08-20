import { Animals } from "@/interaces/animals";

export interface StateAnimals {
  animals: Array<Animals>,
  countTotal?: number,
  page?: number
}


export interface ActionParameters {
  category?: string;
  order?: string
}

export interface Actions {
  commit: any,
  state: StateAnimals
}

