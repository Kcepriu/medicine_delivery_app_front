import { IOrder, emptyOrder } from "../types/typeShop";
const NAME_STORAGE = "DELIVERY";

export const useLocalStorage = () => {
  function saveData(data: IOrder) {
    try {
      const serializedState = JSON.stringify(data);
      localStorage.setItem(NAME_STORAGE, serializedState);
    } catch (Error) {
      // console.error("Set state error: ", Error);
    }
  }

  function loadData(): IOrder {
    let restoredSession = null;
    try {
      const data: string | null = localStorage.getItem(NAME_STORAGE);
      if (data) restoredSession = JSON.parse(data);
    } catch {
      restoredSession = null;
    }

    return restoredSession || { ...emptyOrder };
  }
  return { saveData, loadData };
};
