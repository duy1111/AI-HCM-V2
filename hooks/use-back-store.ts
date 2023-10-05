import { create } from "zustand";
import { Image } from "@/type";
import toast from "react-hot-toast";

interface backItem {
  query: {};
  data: Image[] | null;
  url: string;
  method: 'POST' | 'GET'
}

interface ImagesStore {
  items: backItem[];
  addItem: (data: backItem) => void;
  removeAll: () => void;
  removeOne: () => backItem;
  lastItem: backItem;

}

const useBack = create<ImagesStore>((set, get) => ({
  items: [],
  addItem: (data: backItem) => set({ items: [...get().items, data] }),
  removeAll: () => set({ items: [] }),
  removeOne: ():backItem => {
    const currentItems = get().items;
    if (currentItems.length === 0) {
      toast.error("back a last page");
    }

    let newArr: backItem[] = [];
    let popItem: backItem = currentItems[currentItems.length - 2]
    for (let i = 0; i < currentItems.length - 1; i++) {
      newArr.push(currentItems[i]);
    }
    set({ items: [...newArr],lastItem:popItem });
    return popItem
  },
  lastItem: {
    query: {},
    data: [],
    url:'',
    method: 'POST'
  }
}));

export default useBack;
