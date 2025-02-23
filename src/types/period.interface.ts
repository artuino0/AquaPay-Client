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
  fecha_inicio: Date;
  fecha_fin: Date;
  fecha_limite_pago: Date;
}
