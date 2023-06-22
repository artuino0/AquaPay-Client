export interface IPeriod {
  id: string;
  name: string;
  year: number;
  month: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    name: string;
  };
}
