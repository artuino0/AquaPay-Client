import { Column } from "@/interfaces/columns";

export const TariffColumns: Column[] = [
  {
    label: "Ciclo",
    field: "year",
    type: "text",
  },
  {
    label: "F. Creación",
    field: "createdAt",
    type: "date",
  },
  {
    label: "Creado por",
    field: "createdBy.name",
    type: "text",
  },
  {
    label: "Estado",
    field: "active",
    type: "status",
  },
];
