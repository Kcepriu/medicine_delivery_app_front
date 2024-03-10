import { Bars } from "react-loader-spinner";
import { createPortal } from "react-dom";
import styles from "./MainLoader.module.scss";

const modalRoot = document.querySelector("#modal-root");

const MainLoader = () => {
  if (!modalRoot) return <>...Loading</>;

  return createPortal(
    <div className={styles.Wrap}>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>,
    modalRoot
  );
};

export default MainLoader;
