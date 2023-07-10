import { create } from "zustand";
import requestController from "../helpers/request.axios";
import { IPeriod } from "../types/period.interface";

interface IDataStore {
  onServiceCapture: Boolean;
  setOnServiceCapture: (onServiceCapture: Boolean) => void;
  periodBilling: IPeriod | null;
  fetchData: () => void;
}

export const dataStore = create<IDataStore>((state) => ({
  periodBilling: null,
  onServiceCapture: false,
  setOnServiceCapture: (onServiceCapture: Boolean) => state({ onServiceCapture }),
  fetchData: async () => {
    requestController<IPeriod[]>({ endpoint: "periods", method: "GET" }).then((rs) => {
      let periodBilling = rs.filter((period) => period.active)[0];
      state({ periodBilling });
    });
  },
}));
