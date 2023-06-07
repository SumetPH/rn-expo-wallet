import { create } from "zustand";

type loaderStore = {
  loading: boolean;
  updateLoading: (value: boolean) => void;
};

export const useLoaderStore = create<loaderStore>()((set) => ({
  loading: false,
  updateLoading: (value) => set((state) => ({ loading: value })),
}));
