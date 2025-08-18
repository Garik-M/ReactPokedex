import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import Card from "../Card";
import { PokeData } from "../Card/Card.types";
import Pagination from "../Pagination";
import { ObjData } from "../../page/Home";

type Props = {
  amount: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  startIndex: number;
  data: ObjData[];
  setData: React.Dispatch<React.SetStateAction<ObjData[]>>;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  endIndex: number;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Main = ({
  amount,
  setStartIndex,
  startIndex,
  data,
  setData,
  num,
  setNum,
  active,
  setActive,
  endIndex,
  setEndIndex,
}: Props) => {
  const [details, setDetails] = useState<Record<string, PokeData>>({});
  useEffect(() => {
    setEndIndex(amount + startIndex);
  }, [amount, startIndex]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=900");
        const json = await res.json();
        setData(json.results);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchData();
  }, [setData]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const currentPage = data.slice(startIndex, endIndex);

        const detailPromises = currentPage.map(async (pokemon: ObjData) => {
          const res = await fetch(pokemon.url);
          const pokeData = await res.json();
          return { name: pokemon.name, data: pokeData };
        });

        const results = await Promise.all(detailPromises);
        setDetails((prev) => {
          const updated = { ...prev };
          results.forEach(({ name, data }) => {
            updated[name] = data;
          });
          return updated;
        });
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [startIndex, endIndex, data]);

  const renderCard = data.slice(startIndex, endIndex).map((pokemon) => {
    const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
    const pokeData = details[pokemon.name];
    return <Card name={pokemon.name} key={id} id={id} data={pokeData} />;
  });

  return (
    <>
      <div className={styles.main}>{renderCard}</div>
      <Pagination
        setStartIndex={setStartIndex}
        amount={amount}
        setEndIndex={setEndIndex}
        startIndex={startIndex}
        num={num}
        setNum={setNum}
        active={active}
        setActive={setActive}
      />
    </>
  );
};

export default Main;
