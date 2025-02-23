export interface ToastMessage {
  id: number;
  type: "success" | "danger" | "loading" | "alert";
  message: string;
  refresh?: boolean;
  autoClose?: boolean;
}
