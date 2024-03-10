import { FC, FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./FormAdressOrder.module.scss";
import { useOrder } from "../../hooks/contextOrder";
import { createOrder } from "../../services/apiBackend";
import { showErrorMessage } from "../../helpers/message";
import { getLocationByAddress } from "../../services/apiBackend";

interface IProps {
  isPeople: boolean;
  address: string;
  location: string;
  setAddress: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
}
const FormAdressOrder: FC<IProps> = ({
  isPeople,
  address,
  setAddress,
  location,
  setLocation,
}) => {
  const { order, setFiledToOrder, clearOrder } = useOrder();

  const handlerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setFiledToOrder(event.target.id, event.target.value);
  };

  const handlerChangeAdress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setFiledToOrder("adress", event.target.value);
    setLocation("");
  };

  const validationData = (): boolean => {
    let message = "";

    if (!address) message = message + '\n The "address" field is not filled';
    if (!order.email) message = message + '\n The "email" field is not filled';
    if (!order.phone) message = message + '\n The "phone" field is not filled';
    if (!order.name) message = message + '\n The "name" field is not filled';
    if (order.goodsDocument.length === 0) {
      message = message + "\n No products have been added";
    }
    if (message) showErrorMessage(message);

    return !message;
  };

  const getLocation = async (address: string): Promise<string> => {
    try {
      const addr = await getLocationByAddress(address);
      return addr;
    } catch (Error) {
      return "";
    }
  };

  const handlerOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPeople) return;
    if (!validationData()) return;
    let saveLocation = location;

    if (!saveLocation && address) {
      //витянути локацію по адресі
      saveLocation = await getLocation(address);
    }

    try {
      const saveOrder = { ...order, adress: address, location: saveLocation };

      const result = await createOrder(saveOrder);
      if (result) {
        clearOrder();
        setAddress("");
        setLocation("");
      }
    } catch (error) {
      if (!(error instanceof Error)) return;
      if (error.name !== "CanceledError") {
        console.log("Error create order", error);
        showErrorMessage("Error create order on server");
      }
    }
  };

  return (
    <form className={styles.Form} onSubmit={handlerOnSubmit}>
      <div className={styles.WrapInput}>
        <label htmlFor="adress" className={styles.Label}>
          Address:
        </label>
        <input
          className={styles.Input}
          id="adress"
          type="text"
          value={address}
          onChange={handlerChangeAdress}
          placeholder="Input address"
          required
        />
      </div>
      <div className={styles.WrapInput}>
        <label htmlFor="email" className={styles.Label}>
          Email:
        </label>
        <input
          className={styles.Input}
          id="email"
          type="email"
          value={order.email}
          // pattern="^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})$"
          onChange={handlerOnChange}
          placeholder="Input email"
          required
        />
      </div>
      <div className={styles.WrapInput}>
        <label htmlFor="phone" className={styles.Label}>
          Phone:
        </label>
        <input
          className={styles.Input}
          id="phone"
          pattern="^[+]?\d{1,4}[-.\s]?(\d{1,3})?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
          type="tel"
          value={order.phone}
          onChange={handlerOnChange}
          placeholder="Input phone"
          required
        />
      </div>
      <div className={styles.WrapInput}>
        <label htmlFor="name" className={styles.Label}>
          Name:
        </label>
        <input
          className={styles.Input}
          id="name"
          type="text"
          value={order.name}
          onChange={handlerOnChange}
          placeholder="Input Name"
          required
        />
      </div>

      <button
        type="submit"
        className={styles.ButtonSubmit}
        disabled={!isPeople}
      >
        Submit
      </button>
    </form>
  );
};

export default FormAdressOrder;
