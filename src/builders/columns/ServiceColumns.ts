import { Column } from "@/interfaces/columns";

export const ServiceColumns: Column[] = [
  {
    label: "External ID",
    field: "customerId.externalContractId",
    type: "text",
  },
  {
    label: "No. Medidor",
    field: "meterNumber",
    type: "text",
  },
  {
    label: "Dirección",
    field: ["street", "number"],
    type: "text",
  },
  {
    label: "Tipo Servicio",
    field: "serviceType",
    type: "text",
  },
  {
    label: "Cliente",
    field: ["customerId.name", "customerId.lastName", "customerId.middleName"],
    type: "text",
  },
  {
    label: "Email Cliente",
    field: "customerId.email",
    type: "text",
  },
  {
    label: "Creado Por",
    field: "createdBy.name",
    type: "text",
  },
];
