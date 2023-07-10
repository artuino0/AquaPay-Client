import { create } from "zustand";
import { IChange } from "../interfaces/change";

interface IChangeStore {
  changes: IChange[];
  addChange: (newChange: IChange) => void;
  updateChange: (updatedChange: IChange, tariffId: string, tariffType: string) => void;
  removeChange: (tariffId: string) => void;
  clearChanges: () => void;
}

const localStorageKey = "changeStore";

const loadChangesFromLocalStorage = (): IChange[] => {
  const storedChanges = localStorage.getItem(localStorageKey);
  return storedChanges ? JSON.parse(storedChanges) : [];
};

const ChangeStore = create<IChangeStore>((set) => ({
  changes: loadChangesFromLocalStorage(),
  addChange: (newChange) =>
    set((state) => {
      const updatedChanges = [...state.changes, newChange];
      localStorage.setItem(localStorageKey, JSON.stringify(updatedChanges));
      return { changes: updatedChanges };
    }),
  updateChange: (updatedChange, tariffId, tariffType) =>
    set((state) => {
      const updatedChanges = state.changes.map((change) => (change.tariffId === tariffId && tariffType === change.typeTariff ? updatedChange : change));
      localStorage.setItem(localStorageKey, JSON.stringify(updatedChanges));
      return { changes: updatedChanges };
    }),
  removeChange: (tariffId) =>
    set((state) => {
      const updatedChanges = state.changes.filter((change) => change.tariffId !== tariffId);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedChanges));
      return { changes: updatedChanges };
    }),
  clearChanges: () => {
    set((state) => {
      const updatedChanges: IChange[] = [];
      localStorage.removeItem(localStorageKey);
      return { changes: updatedChanges };
    });
  },
}));

export default ChangeStore;
