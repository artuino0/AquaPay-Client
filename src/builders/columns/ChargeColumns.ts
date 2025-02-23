import { Column } from "@/interfaces/columns";

export const chargeColumns: Column[] = [
  { label: "Nombre del cargo", field: "name", type: "text", align: "text-left" },
  { label: "Tarifa", field: "amount", type: "amount", align: "text-center" },
  { label: "Estado", field: "active", type: "status", align: "text-center" },
  { label: "Creado Por", field: "createdBy.name", type: "text", align: "text-center" },
];