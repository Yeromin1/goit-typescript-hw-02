import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => (
  <div className={styles.error}>
    <p>Something went wrong. Please try again later.</p>
  </div>
);

export default ErrorMessage;
