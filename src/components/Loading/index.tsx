import styles from "./Loading.module.scss";

const Loading = () => (
  <div className={styles.content}>
    <div className={styles.container}>
      <div className={styles.loading}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  </div>
);

export default Loading;
