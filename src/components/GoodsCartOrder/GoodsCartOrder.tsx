import { FC, ChangeEvent, useEffect, useState } from "react";
import type { IGoodsOrder } from "../../types/typeShop";
import { useOrder } from "../../hooks/contextOrder";
import styles from "./GoodsCartOrder.module.scss";
import { getInfoGoods } from "../../services/apiBackend";
import { emptyGoods } from "../../types/typeShop";
interface IProps {
  goods: IGoodsOrder;
}

const GoodsCartOrder: FC<IProps> = ({ goods }) => {
  const { deleteGoods, changeCountGoods } = useOrder();
  const [count, setCount] = useState(goods.count);
  const [goodsFull, setGoodsFull] = useState({ ...emptyGoods });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const goodsInfo = await getInfoGoods(goods.goods, controller);
        setGoodsFull(goodsInfo);
      } catch (Error) {
        setGoodsFull({ ...emptyGoods });
        // console.log("Error fetch information obout goods", Error);
      }
    };

    load();

    return () => {
      controller.abort();
    };
  }, [goods.goods]);

  const handlerChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(Number(event.target.value));
    changeCountGoods(goods.goods, Number(event.target.value));
  };

  return (
    <div className={styles.WrapCart}>
      <div className={styles.WrapImg}>
        <img
          src={goodsFull.urlPicture}
          alt={goodsFull.name}
          height="20"
          className={styles.Image}
        />
      </div>
      <div className={styles.WrapContent}>
        <button
          type="button"
          className={styles.BtnDelete}
          onClick={() => deleteGoods(goods.goods)}
        >
          Delete
        </button>

        <div className={styles.WrapTitle}>
          <h4>{goodsFull.name} </h4>

          <p>
            Price: <span>{goods.price}</span>
          </p>
          <p>
            Summ: <span>{goods.sum}</span>
          </p>
        </div>

        <input
          name="count"
          type="number"
          min="1"
          value={count}
          onChange={handlerChangeCount}
          className={styles.InputCount}
        />
      </div>
    </div>
  );
};

export default GoodsCartOrder;
