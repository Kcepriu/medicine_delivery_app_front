import { FC, useRef, useState } from "react";
import { useOrder } from "../../hooks/contextOrder";
import styles from "./Order.module.scss";
import FormAdressOrder from "../../components/FormAdressOrder/FormAdressOrder";
import Map from "../../components/Map/Map";
import GoodsCartOrder from "../../components/GoodsCartOrder/GoodsCartOrder";

import ReCAPTCHA from "react-google-recaptcha";

const Order: FC = () => {
  const { order, clearOrder } = useOrder();
  const [isPeople, setIsPeople] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  //
  const [address, setAddress] = useState(order.adress);
  const [location, setLocation] = useState(order.location);

  function handlerCaptcha(value: string | null) {
    setIsPeople(!!value);
  }
  const handlerCancelOrder = () => {
    clearOrder();
    // The address is determined automatically, it may not be necessary to reset it
    // setAddress("");
    setLocation("");

    //Reset captcha
    if (recaptchaRef.current) recaptchaRef.current.reset();
  };

  return (
    <div className={styles.WrapPage}>
      <div className={styles.WrapColumn}>
        <div className={styles.WrapMap}>
          <Map setAddress={setAddress} setLocation={setLocation} />
        </div>
        <FormAdressOrder
          isPeople={isPeople}
          address={address}
          setAddress={setAddress}
          location={location}
          setLocation={setLocation}
        />
      </div>
      <div className={styles.WrapRight}>
        <div className={styles.WrapOrderContent}>
          <ul className={styles.ListGoods}>
            {order.goodsDocument.map((goods) => {
              return (
                <li key={goods.goods}>
                  <GoodsCartOrder goods={goods} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.WrapCaptcha}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_CAPTHCA_KEY || ""}
            onChange={handlerCaptcha}
          />
        </div>

        <div className={styles.Basement}>
          <p className={styles.TotalPrice}>
            Total price: <span>{order.sum} </span>
          </p>
        </div>
        <button
          type="button"
          className={styles.ButtonCancel}
          onClick={handlerCancelOrder}
        >
          Cancel order
        </button>
      </div>
    </div>
  );
};

export default Order;
