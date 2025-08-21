import styles from "./InfoContainer.module.scss";
import { PokeData } from "../Card/Card.types";
import StatBox from "../StatBox";

type Props = {
  infosOne: {
    height: number | undefined;
    weight: number | undefined;
    category: string | undefined;
    types: string[] | undefined;
    abilities: string[] | undefined;
    genders: string;
    flavor: string | undefined;
    img: string | undefined;
  };
  data: PokeData | undefined;
};

type BoxProp = {
  isActive: string;
};
const Box = ({ isActive }: BoxProp) => {
  return <div className={`${styles.box} ${isActive}`} />;
};

const InfoContainer = ({ infosOne, data }: Props) => {
  const state = {
    Height: infosOne.height! / 10 + "m",
    Weight: infosOne.weight! / 10 + "kg",
    Category: infosOne.category?.slice(0, -8),
    Types: infosOne.types?.join(" "),
    Abilities: infosOne.abilities?.join(" "),
    Genders: infosOne.genders,
  };

  const infos = Object.keys(state).map((info, i) => (
    <StatBox key={i} name={info} value={Object.values(state)[i]} />
  ));

  const boxArr = Array.from({ length: 15 }, (_, i) => i + 1);
  const maxVal = 300;

  const charts = data?.stats.map((stat) => {
    const value = maxVal - stat.base_stat;
    const name = stat.stat.name;

    const boxes = boxArr.map((lvl) => {
      const isActive =
        value < Math.ceil(maxVal / 15) * lvl ? styles.active : "";
      return <Box key={lvl} isActive={isActive} />;
    });
    const result = name
      .split("-")
      .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
      .join(" ");
    return (
      <div key={name}>
        <div className={styles.chart}>{boxes}</div>
        <p className={styles.chartName}>
          {result}
        </p>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.imgDiv}>
        <img src={infosOne.img} alt="pokemon avatar" />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.flavor}>{infosOne.flavor}</p>
        <div className={styles.stats}>{infos}</div>
        <div className={styles.charts}>
          <p className={styles.heading}>Stats</p>
          <div className={styles.content}>{charts}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoContainer;
