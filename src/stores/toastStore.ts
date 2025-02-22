import { create } from "zustand";
import { ToastMessage } from "../interfaces/toast";

interface ToastStore {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => number;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => {
  let toastIdCounter = 0;

  return {
    toasts: [],

    addToast: (toast) => {
      const id = ++toastIdCounter;
      const newToast: ToastMessage = { ...toast, id };

      set((state) => ({ toasts: [...state.toasts, newToast] }));

      if (toast.autoClose !== false) {
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
          if (toast.refresh) {
            window.location.reload();
          }
        }, 3000);
      }

      return id;
    },

    removeToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    },
  };
});
