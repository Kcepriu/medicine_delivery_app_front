import { FC, useEffect, useState } from "react";
import { useOrder } from "../../hooks/contextOrder";
import { FaRegStar, FaStar } from "react-icons/fa";
import { changeIsFavoriteFood } from "../../services/apiBackend";

import type { IGoods } from "../../types/typeShop";
import styles from "./GoodsCartShop.module.scss";

interface IProps {
  goods: IGoods;
}

const GoodsCartShop: FC<IProps> = ({ goods }) => {
  const { addGoods, setFiledToOrder } = useOrder();

  const handlerOnClick = () => {
    setFiledToOrder("shop", goods.shop);
    addGoods(goods, 1);
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handlSetFavorite = async () => {
    const result = await changeIsFavoriteFood(goods, !isFavorite);
    if (result) setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    setIsFavorite(!!goods.isFavorite);
  }, [goods]);

  return (
    <div className={styles.CartGoods}>
      <div className={styles.wrapFavorite} onClick={handlSetFavorite}>
        {!isFavorite ? <FaRegStar size={32} /> : <FaStar size={32} />}
      </div>

      <img
        src={goods.urlPicture}
        alt={goods.name}
        height="20"
        className={styles.Image}
      />
      <h3>{goods.name}</h3>
      <p>Price: {goods.price}</p>
      <button
        type="button"
        className={styles.ButtonAdd}
        onClick={handlerOnClick}
      >
        add to Cart
      </button>
    </div>
  );
};

export default GoodsCartShop;
