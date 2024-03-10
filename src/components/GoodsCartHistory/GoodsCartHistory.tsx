import { FC } from "react";
import type { IGoodsFullOrder } from "../../types/typeShop";
import styles from "./GoodsCartHistory.module.scss";

interface IProps {
  goods: IGoodsFullOrder;
}

const GoodsCartHistory: FC<IProps> = ({ goods }) => {
  const { goods: descriptionGoods } = goods;

  return (
    <div className={styles.WrapCart}>
      <div className={styles.WrapImg}>
        <img
          src={descriptionGoods.urlPicture}
          alt={descriptionGoods.name}
          height="20"
          className={styles.Image}
        />
      </div>
      <div className={styles.WrapContent}>
        <h4>{descriptionGoods.name} </h4>

        <p>
          Count: <span>{goods.count}</span>
        </p>
        <p>
          Price: <span>{descriptionGoods.price}</span>
        </p>

        <p>
          Summ: <span>{goods.sum}</span>
        </p>
      </div>
    </div>
  );
};

export default GoodsCartHistory;
