import { useEffect, useState } from "react";
import Card from "../Card";
import { EvolveType, PokeData, SpeciesType } from "../Card/Card.types";
import styles from "./EvolveCard.module.scss";
import Loading from "../Loading";

type Props = {
  name: string | undefined;
  data: EvolveType | undefined;
};
const EvolveCard = ({ name, data }: Props) => {
  const [pokeData, setPokeData] = useState<PokeData>();

  const getEvolveCardData = async () => {
    const chain = data!.chain
    let url = chain.species.name === name
      ? chain.species.url
      : chain.evolves_to?.[0].species.name === name
      ? chain.evolves_to?.[0].species.url
      : chain.evolves_to?.[0].evolves_to?.[0].species.name === name
      ? chain.evolves_to?.[0].evolves_to?.[0].species.url : null
    
    const speciesDataOne = await fetch(url!);
    const speciesData: SpeciesType = await speciesDataOne.json();
    const pokeDataOne = await fetch(speciesData.varieties[0].pokemon.url);
    const pokeData = await pokeDataOne.json();
    setPokeData(pokeData);
  };

  useEffect(() => {
    getEvolveCardData();
  }, []);

  const urlId = pokeData?.species.url;
  const id = urlId?.split("/")[urlId.split("/").length - 2];
  
  return !name || !id || !data ? (
    <div className={styles.presser}>
      <Loading />
    </div>
  ) : (
    <Card name={name} id={id} data={pokeData} />
  );
};

export default EvolveCard;
