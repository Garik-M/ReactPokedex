import styles from "./Main.module.scss";
import { useEffect } from "react";
import Card from "components/Card";
import { PokeData } from "components/Card/Card.types";
import Pagination from "components/Pagination";
import { ObjData } from "page/Home";

type Props = {
  amount: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  startIndex: number;
  data: ObjData[];
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  endIndex: number;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
  details: Record<string, PokeData>;
};

const Main = ({
  amount,
  setStartIndex,
  startIndex,
  data,
  num,
  setNum,
  active,
  setActive,
  endIndex,
  setEndIndex,
  details,
}: Props) => {
  useEffect(() => {
    setEndIndex(amount + startIndex);
  }, [amount, startIndex]);

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
        data={data}
      />
    </>
  );
};

export default Main;
