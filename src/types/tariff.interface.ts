import { Pagination } from "@/interfaces/pagination";

export interface ITariff {
  _id: string;
  year: number;
  tariffs: TariffElement[];
  createdBy: CreatedBy;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ITariffRequest = {
  data: ITariff[];
  pagination: Pagination;
};

interface CreatedBy {
  id: string;
  name: string;
}

export interface TariffElement {
  consumption: number;
  domestic: {
    $numberDecimal: number;
  };
  commercial: {
    $numberDecimal: number;
  };
  mixed: {
    $numberDecimal: number;
  };
  _id: string;
}
