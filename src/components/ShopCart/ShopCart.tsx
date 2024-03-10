import { FC } from "react";
import clsx from "clsx";
import type { IShop } from "../../types/typeShop";
import styles from "./ShopCart.module.scss";

interface IProps {
  active: boolean;
  isHover: boolean;
  shop: IShop;
}

const ShopCart: FC<IProps> = ({ shop, active, isHover }) => {
  return (
    <div
      className={clsx(
        styles.Cart,
        active && styles.active,
        isHover && styles.isHover
      )}
    >
      <p>{shop.name}</p>
    </div>
  );
};

export default ShopCart;
