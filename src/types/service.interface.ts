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
  charges: any[]; // Ajusta el tipo de acuerdo a la estructura real de "charges"
  createdBy: {
    id: string;
    name: string;
  };
  __v: number;
}

export interface IServiceGetResponse {
  totalServices: number;
  totalPages: number;
  currentPage: number;
  services: IService[];
}
