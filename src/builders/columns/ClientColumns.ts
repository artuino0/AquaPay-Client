import { Column } from "@/interfaces/columns";

export const customerColumns: Column[] = [
  {
    field: "externalContractId",
    label: "ID Externo",
    type: "text",
    align: "text-center",
  },
  {
    field: ["name", "lastName", "middleName"],
    label: "Nombre Completo",
    type: "text",
    align: "text-left",
  },
  {
    field: "email",
    label: "Correo Electrónico",
    type: "text",
    align: "text-center",
  },
  {
    field: "phoneNumber",
    label: "Teléfono",
    type: "text",
    align: "text-center",
  },
  {
    field: "services",
    label: "Servicios",
    type: "size",
    align: "text-center",
  },
  {
    field: "active",
    label: "Estado",
    type: "status",
    align: "text-center",
  },
  {
    field: "createdBy.name",
    label: "Creado Por",
    type: "text",
    align: "text-center",
  },
];
