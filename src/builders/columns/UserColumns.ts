import { Column } from "@/interfaces/columns";

export const UserColumns: Column[] = [
  {
    field: "name",
    label: "Nombre",
    type: "text",
    align: "text-left",
    sortable: true,
  },
  {
    field: "email",
    label: "Correo Electrónico",
    type: "text",
  },
  {
    field: "phone",
    label: "Teléfono",
    type: "text",
  },
  {
    field: "createdAt",
    label: "Fecha de Creación",
    type: "date",
    sortable: true,
  },
  {
    field: "updatedAt",
    label: "Fecha de Actualización",
    type: "date",
    sortable: true,
  },
  {
    field: "active",
    label: "Estado",
    type: "status",
    sortable: true,
  },
];
