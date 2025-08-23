import styles from "./NotFound.module.scss";

const NotFound = () => {
  const arr = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className={styles.container}>
      <div className={styles.half}>
        <p style={{ marginRight: "200px" }}>404</p>
      </div>
      <div>
        {arr.map((i) => (
          <div
            key={i}
            className={`${styles.circle} ${i % 2 === 1 ? styles.black : ""}`}
          ></div>
        ))}
      </div>
      <div className={styles.half}>
        <p style={{ marginLeft: "200px" }}>Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
