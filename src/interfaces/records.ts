export interface IRecordsService {
  lastRead: number;
  previousDebt: number;
  _id: string;
  customerId: CustomerID;
  meterNumber: string;
  status: boolean;
  serviceType: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  charges: any[];
  createdBy: string;
  __v: number;
  records: Record[];
}

export interface CustomerID {
  id: string;
  externalContractId: number;
  name: string;
  lastName: string;
  middleName: string;
  services: string[];
  phoneNumber: string;
  active: boolean;
  createdBy: string;
}

export interface Record {
  _id: string;
  serviceId: string;
  createdBy: string;
  periodId: PeriodID;
  currentRecord: number;
  createdAt: string;
  upstringdAt: string;
  __v: number;
}

export interface PeriodID {
  _id?: string;
  id?: string;
  name: string;
  year: number;
  month: number;
  active: boolean;
  activePayments: boolean;
  createdBy: string;
  createdAt: string;
  upstringdAt: string;
}
