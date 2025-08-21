import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import styles from "./Pokemon.module.scss";

import {
  EvolveType,
  PokeData,
  SpeciesType,
} from "../../components/Card/Card.types";
import InfoContainer from "../../components/InfoContainer";
import Evolution from "../../components/Evolution";
import Loading from "../../components/Loading";

const Pokemon = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<PokeData>();
  const [speciesData, setSpeciesData] = useState<SpeciesType>();
  const [evolveData, setEvolveData] = useState<EvolveType>();

  const getData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.id}`
      );

      if (!response.ok) {
        return navigate("/404");
      }
      const dataOne = await response.json();
      setData(dataOne);
      const res = await fetch(dataOne.species.url);
      const speciesDataOne = await res.json();
      setSpeciesData(speciesDataOne);
    } catch (err) {
      console.log(`caught ${err} \n\n at fetching`);
    }
  };

  const getEvolveData = async () => {
    if (!speciesData?.evolution_chain?.url) return;

    const evolveDataOne = await fetch(speciesData?.evolution_chain.url);
    const evolveData = await evolveDataOne.json();
    setEvolveData(evolveData);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getData();
  }, [params.id]);

  useEffect(() => {
    getEvolveData();
  }, [speciesData]);

  const infos = {
    height: data?.height,
    weight: data?.weight,
    types: data?.types.map((t) => t.type.name),
    category: speciesData?.genera.find((g) => g.language.name === "en")?.genus,
    genders: "genderless",
    abilities: data?.abilities
      .filter((a) => !a.is_hidden)
      .map((a) => a.ability.name),
    flavor: speciesData?.flavor_text_entries.find(
      (obj) => obj.language.name === "en"
    )?.flavor_text,
    img: data?.sprites.other["official-artwork"].front_default,
  };

  const id =
    params.id?.length === 1
      ? "00" + params.id
      : params.id?.length === 2
      ? "0" + params.id
      : params.id;

  const name = `${data?.forms[0].name
    .slice(0, 1)
    .toUpperCase()}${data?.forms[0].name.slice(1)} #${id}`;

  return !data || !speciesData || !evolveData ? (
    <div className={styles.contain}>
      <Loading />
    </div>
  ) : (
    <div className={styles.content}>
      <div>
        <Link to="/" className={styles.link}>
          ← Explore more Pokémon
        </Link>
      </div>
      <div className={styles.name}>{name}</div>
      <InfoContainer infosOne={infos} data={data} />
      <Evolution data={evolveData} />
    </div>
  );
};

export default Pokemon;
