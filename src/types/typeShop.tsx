export interface IShop {
  _id: string;
  name: string;
  location: string;
  adress: string;
  [index: string]: string;
}

export const epmptyShop = {
  _id: "",
  name: "",
  location: "",
  adress: "",
};
export interface IGoods {
  _id: string;
  name: string;
  urlPicture: string;
  price: number;
  shop: string;
  isFavorite: boolean;
  // createdAt: string;
  // updatedAt: string;
}

export interface IGoodsOrder {
  goods: string;
  count: number;
  sum: number;
  price: number;
}
export interface IGoodsFullOrder {
  goods: IGoods;
  count: number;
  sum: number;
  price: number;
}

export interface IOrder {
  _id: string;
  name: string;
  shop: string;
  phone: string;
  email: string;
  location: string;
  adress: string;
  sum: number;
  goodsDocument: IGoodsOrder[];
}

export interface IOrderWithGoods {
  _id: string;
  name: string;
  shop: string;
  phone: string;
  email: string;
  location: string;
  adress: string;
  sum: number;
  goodsDocument: IGoodsFullOrder[];
}

export const emptyOrder: IOrder = {
  _id: "",
  name: "",
  shop: "",
  phone: "",
  email: "",
  location: "",
  adress: "",
  sum: 0,
  goodsDocument: [],
};

export const emptyGoods: IGoods = {
  _id: "",
  name: "",
  urlPicture: "",
  price: 0,
  shop: "",
  isFavorite: false,
};

export interface IFilter {
  id: string;
  phone: string;
  email: string;
}

export const emptyFilter: IFilter = {
  id: "",
  phone: "",
  email: "",
};
