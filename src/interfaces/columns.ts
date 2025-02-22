export interface Column {
  field: string | string[];
  backupField?: string | string[];
  label: string;
  type: "text" | "amount" | "date" | "boolean" | "status" | "size";
  style?: string;
  translate?: boolean;
  sortable?: boolean;
  align?: "text-left" | "text-center" | "text-right";
}
