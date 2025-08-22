import styles from "./Evolution.module.scss";
import EvolveCard from "components/EvolveCard";
import { EvolveType } from "components/Card/Card.types";

type EvolveProp = {
  data: EvolveType | undefined;
};
const Evolution = ({ data }: EvolveProp) => {
  const chain = data?.chain;

  const evolveCardOne = chain ? (
    <EvolveCard name={chain?.species.name} data={data} />
  ) : (
    ""
  );
  
  const evolveCardTwo =
    chain?.evolves_to.length !== 0 ? (
      <EvolveCard name={chain?.evolves_to[0].species.name} data={data} />
    ) : (
      ""
    );

  const evolveCardThree =
    chain?.evolves_to.length !== 0 &&
    chain?.evolves_to[0].evolves_to.length !== 0 ? (
      <EvolveCard
        name={chain?.evolves_to[0].evolves_to[0].species.name}
        data={data}
      />
    ) : (
      ""
    );

  return (
    <div className={styles.evolution_container}>
      <p className={styles.headline}>Evolution</p>
      <div className={styles.evolutions}>
        {evolveCardOne}
        {evolveCardTwo}
        {evolveCardThree}
      </div>
    </div>
  );
};

export default Evolution;
