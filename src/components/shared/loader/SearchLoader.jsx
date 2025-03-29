import styles from "./SearchLoader.module.css";

const SearchLoader = () => {
  return (
    <div className={styles.dot_spinner}>
      <div className={styles.dot_spinner__dot}></div>
      <div className={styles.dot_spinner__dot}></div>
      <div className={styles.dot_spinner__dot}></div>
      <div className={styles.dot_spinner__dot}></div>
      <div className={styles.dot_spinner__dot}></div>
      <div className={styles.dot_spinner__dot}></div>
      <div className={styles.dot_spinner__dot}></div>
      <div className={styles.dot_spinner__dot}></div>
    </div>
  );
};

export default SearchLoader;