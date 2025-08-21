import styles from "./StatBox.module.scss";

type Props = {
  name: string;
  value: string | undefined;
}

const StatBox = ({name, value}: Props) => {
  return (
    <div key={name} className={styles.statBox}>
      <p className={styles.statName}>{name}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
};

export default StatBox;