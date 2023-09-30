import { create } from "zustand";
import { Image } from "@/type";


interface ImagesStore {
    items: Image[],
    addItem: (data: Image[]) => void;
    removeAll: () => void;
}

const useImage = create<ImagesStore>((set) => ({
    items: [],
    addItem: (data: Image[]) => set({items: data}),
    removeAll: () => set({items: []})
}));

export default useImage