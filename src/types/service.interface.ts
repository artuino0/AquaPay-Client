export interface IService {
  _id: string;
  customerId: {
    id: string;
    externalContractId: number;
    name: string;
    lastName: string;
    middleName: string;
  };
  meterNumber: string;
  status: boolean;
  serviceType: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  charges: any[];
  createdBy: {
    id: string;
    name: string;
  };
  __v: number;
  lastRead: number | null;
  previousDebt: number | null;
}

export type IServiceCreate = {
  customerId: string;
  meterNumber: string;
  serviceType: string;
  street: string;
  number: string;
  lastRead: number | null;
  previousDebt: number | null;
};

export type IServiceUpdate = Partial<IServiceCreate>;

export interface IServiceGetResponse {
  totalServices: number;
  totalPages: number;
  currentPage: number;
  services: IService[];
}
