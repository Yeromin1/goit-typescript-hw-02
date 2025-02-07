import { Bars } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles.loader}>
    <Bars height="80" width="80" color="#00BFFF" />
  </div>
);

export default Loader;
