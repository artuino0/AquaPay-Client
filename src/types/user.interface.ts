export interface IUser {
  id: string;
  phone?: string;
  name: string;
  email: string;
  createdBy?: {
    _id: string;
    name: string;
  };
  active: boolean;
  createdAt: string;
  updatedAt: string;
  temporalPass?: string;
}
