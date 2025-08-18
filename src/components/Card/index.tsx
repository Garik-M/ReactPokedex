import { PokeData, Proptype } from "./Card.types";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

const Card = ({ name, id, data }: Proptype) => {
  const pic = data?.sprites?.other?.["official-artwork"]?.front_default;
  const finalId = id.length >= 3 ? id : id.length === 2 ? "0" + id : "00" + id;
  const newName = name.slice(0, 1).toUpperCase() + name.slice(1);
  const dataTypes = data?.types
    .map((obj) => {
      return obj.type.name;
    })
    .join(", ");

  const handlePokemonClick = () => {
    <Link to={`/pokemon/${Number(id)}`} />;
  };
  if (!pic) {
    return (
      <div className={styles.card}>
        <div className={styles.imgDiv}>
          <div className={styles.loader}>
            <div className={styles.circle}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <Link to={`/pokemon/${Number(id)}`} className={styles.link}>
        <div className={styles.imgDiv} tabIndex={0}>
          <img
            className={styles.img}
            src={data.sprites.other["official-artwork"].front_default}
            alt={name}
          />
        </div>
      </Link>
      <p className={styles.name}>{newName}</p>
      <p className={styles.id}>#{finalId}</p>
      <p className={styles.types}>{dataTypes}</p>
    </div>
  );
};

export default Card;
