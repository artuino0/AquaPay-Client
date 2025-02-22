export interface ToastMessage {
  id: number;
  type: "success" | "danger" | "loading";
  message: string;
  refresh?: boolean;
  autoClose?: boolean;
}
