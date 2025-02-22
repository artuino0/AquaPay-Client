import { useToastStore } from "../stores/toastStore";
import { ToastMessage } from "@/interfaces/toast";
import Toast from "./ToastItem";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-16 right-0 p-4 flex flex-col gap-4 z-50">
      {toasts.map((toast: ToastMessage) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          toastIndex={toast.id}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
