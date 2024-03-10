import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.ContainerLoader}>
      <ThreeDots
        height="80"
        width="180"
        radius="9"
        color="#303f9f"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
