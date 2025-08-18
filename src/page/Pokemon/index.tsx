import { useEffect, useState } from "react";
import styles from "./Pokemon.module.scss";
import { Link, useParams } from "react-router-dom";
import { PokeData } from "../../components/Card/Card.types";

type Prop = {};

const Pokemon = ({}: Prop) => {
  const [data, setData] = useState<PokeData>();

  const params = useParams();

  const getData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${params.id}`
    );

    if (response.ok) {
      const data = await response.json();
      setData(data);
    } else {
      return <div>404 not Found</div>;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const id =
    params.id?.length === 1
      ? "00" + params.id
      : params.id?.length === 2
      ? "0" + params.id
      : params.id;

  const name = `${data?.forms[0].name
    .slice(0, 1)
    .toUpperCase()}${data?.forms[0].name.slice(1)} #${id}`;

  const isLoading = `undefinedundefined #${id}`;
  const loading = (
    <div className={styles.loadingName}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </div>
  );
  const img = data?.sprites.other["official-artwork"].front_default;
  return (
    <div className={styles.content}>
      <div>
        <Link to="/" className={styles.link}>
          ← Explore more Pokémon
        </Link>
      </div>
      <div className={styles.name}>{name === isLoading ? loading : name}</div>
      <div className={styles.container}>
        <div className={styles.imgDiv}>
          {!img ? loading : <img src={img} />}
        </div>
        <div className={styles.flavor}>{}</div>
        <div className={styles.stats}>
          <div className={styles.statBox}></div>
          <div className={styles.statBox}></div>
          <div className={styles.statBox}></div>
          <div className={styles.statBox}></div>
          <div className={styles.statBox}></div>
          <div className={styles.statBox}></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Pokemon;
