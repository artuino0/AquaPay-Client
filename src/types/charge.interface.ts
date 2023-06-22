export interface ICharge {
  id: string;
  name: string;
  amount: number;
  active: boolean;
  createdBy: {
    _id: string;
    name: string;
  };
}
