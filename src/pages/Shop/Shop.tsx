import { FC } from "react";
import ShopsList from "../../components/ShopsList/ShopsList";
import GoodsListShop from "../../components/GoodsListShop/GoodsListShop";

import style from "./Shop.module.scss";

const Shop: FC = () => {
  return (
    <div className={style.WrapPage}>
      <div className={style.WrapShops}>
        <h3 className={style.TitleShops}>Shops:</h3>
        <ShopsList />
      </div>
      <div className={style.WrapGoods}>
        <GoodsListShop />
      </div>
    </div>
  );
};

export default Shop;
