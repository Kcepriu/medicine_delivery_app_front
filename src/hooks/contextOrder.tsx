import {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { IOrder, IGoods, IGoodsOrder } from "../types/typeShop";
import { emptyOrder } from "../types/typeShop";
import cloneDeep from "lodash.clonedeep";

import { useLocalStorage } from "./localStorage";

const emptyGoodsOrder: IGoodsOrder = {
  goods: "",
  count: 0,
  sum: 0,
  price: 0,
};

interface IContextProps {
  order: IOrder;
  setFiledToOrder: <
    T extends keyof Omit<IOrder, "goodsDocument">,
    U extends IOrder[T]
  >(
    nameField: T,
    value: U
  ) => void;
  addGoods: (goods: IGoods, count: number) => void;
  deleteGoods: (goodsId: string) => void;
  changeCountGoods: (goodsId: string, count: number) => void;
  clearOrder: () => void;
}

const ContextOrder = createContext({} as IContextProps);

export const useOrder = () => useContext(ContextOrder);

const getSumDocument = (goods: IGoodsOrder[]): number => {
  const sum = goods.reduce((sum, element) => sum + element.sum, 0);
  return sum;
};

export const OrderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { saveData, loadData } = useLocalStorage();

  const [order, setOrder] = useState<IOrder>(() => loadData());

  useEffect(() => {
    saveData(order);
  }, [order, saveData]);

  function setFiledToOrder<
    T extends keyof Omit<IOrder, "goodsDocument">,
    U extends IOrder[T]
  >(nameField: T, value: U) {
    setOrder((prev) => {
      return {
        ...prev,
        [nameField]: value,
      };
    });
  }

  function addGoods(goods: IGoods, count: number) {
    setOrder((prev) => {
      const { goodsDocument } = prev;
      const newGoodsDocument = cloneDeep(goodsDocument);

      // 1 find the line
      const index = newGoodsDocument.findIndex(
        (elem) => elem.goods === goods._id
      );

      let selectedRow;

      if (index < 0) {
        // if not fount .Create New
        selectedRow = { ...emptyGoodsOrder };

        // fill data
        selectedRow.goods = goods._id;
        selectedRow.price = goods.price;

        // Add to array
        newGoodsDocument.push(selectedRow);
      } else {
        selectedRow = newGoodsDocument[index];
      }

      // 1.2 change the amount
      selectedRow.count += count;

      // 3 count the sum of the line
      selectedRow.sum = selectedRow.count * goods.price;

      // 4 calculate the amount of the document
      const sum = getSumDocument(newGoodsDocument);

      return {
        ...prev,
        sum,
        goodsDocument: [...newGoodsDocument],
      };
    });
  }

  // * changeCountGoods
  function changeCountGoods(goodsId: string, count: number) {
    setOrder((prev) => {
      const { goodsDocument } = prev;

      const newGoodsDocument = cloneDeep(goodsDocument);

      // 1 find the line
      const index = newGoodsDocument.findIndex(
        (elem) => elem.goods === goodsId
      );

      if (index < 0)
        return {
          ...prev,
        };
      // 1.2 change the amount
      newGoodsDocument[index].count = count;

      // 3 count the sum of the line
      newGoodsDocument[index].sum = count * newGoodsDocument[index].price;

      // 4 calculate the amount of the document
      const sum = getSumDocument(newGoodsDocument);
      return {
        ...prev,
        sum,
        goodsDocument: newGoodsDocument,
      };
    });
  }

  // *  deleteGoods
  function deleteGoods(goodsId: string) {
    setOrder((prev) => {
      const { goodsDocument } = prev;

      const newGoodsDocument = goodsDocument.filter(
        (elem) => elem.goods !== goodsId
      );

      const shop = newGoodsDocument.length === 0 ? "" : prev.shop;

      const sum = getSumDocument(newGoodsDocument);

      return {
        ...prev,
        shop,
        sum,
        goodsDocument: newGoodsDocument,
      };
    });
  }

  // *  clearOrder
  function clearOrder() {
    setOrder({ ...emptyOrder });
  }

  return (
    <ContextOrder.Provider
      value={{
        order,
        setFiledToOrder,
        addGoods,
        deleteGoods,
        changeCountGoods,
        clearOrder,
      }}
    >
      {children}
    </ContextOrder.Provider>
  );
};
