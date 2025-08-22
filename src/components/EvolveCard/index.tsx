import { useEffect, useState } from "react";
import Card from "components/Card";
import { EvolveType, PokeData, SpeciesType } from "components/Card/Card.types";
import styles from "./EvolveCard.module.scss";
import Loading from "components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string | undefined;
  data: EvolveType | undefined;
};
const EvolveCard = ({ name, data }: Props) => {
  const navigate = useNavigate();
  const [pokeData, setPokeData] = useState<PokeData>();

  const getEvolveCardData = async () => {
    const chain = data!.chain;
    let url =
      chain.species.name === name
        ? chain.species.url
        : chain.evolves_to?.[0].species.name === name
        ? chain.evolves_to?.[0].species.url
        : chain.evolves_to?.[0].evolves_to?.[0].species.name === name
        ? chain.evolves_to?.[0].evolves_to?.[0].species.url
        : null;

    try {
      const speciesData = await axios.get<SpeciesType>(url!);
      const pokeData = await axios.get(speciesData.data.varieties[0].pokemon.url);
      setPokeData(pokeData.data);
    } catch (err) {
      console.error(err);
      return navigate("/404");
    }
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
