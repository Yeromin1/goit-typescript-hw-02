import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  children?: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <div className={styles.error}>
    <p>{children || "Something went wrong. Please try again later."}</p>
  </div>
);

export default ErrorMessage;
