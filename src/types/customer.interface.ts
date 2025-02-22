import { Pagination } from "../interfaces/pagination";
export interface ICustomer {
  id: string;
  externalContractId: number;
  name: string;
  lastName: string;
  middleName: string;
  services: string[];
  phoneNumber?: string;
  lastRecord: number;
  lastBalance: number;
  email?: string;
  active: boolean;
  createdBy: {
    _id: string;
    name: string;
  };
}

export type ICustomerResponse = Partial<ICustomer>;

export type ICustomerCreate = Omit<
  ICustomer,
  "id" | "createdAt" | "updatedAt" | "createdBy"
>;
export type ICustomerUpdate = Partial<ICustomerCreate>;

export interface ICustomerRequest {
  data: ICustomerResponse[];
  pagination: Pagination;
}

export interface ICustomerByID {
  id: string;
  externalContractId: number;
  name: string;
  lastName: string;
  middleName: string;
  services: Service[];
  phoneNumber: string;
  createdBy: User;
  active: boolean;
}

interface Service {
  _id: string;
  customerId: string;
  meterNumber: string;
  status: boolean;
  serviceType: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  charges: any[];
  createdBy: User;
  __v: number;
}

interface User {
  _id: string;
  name: string;
}
