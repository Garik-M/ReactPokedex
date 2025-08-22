import { useEffect, useState } from "react";
import Header from "components/Header";
import Main from "components/Main";
import styles from "./Home.module.scss";
import { PokeData } from "components/Card/Card.types";
import axios from "axios";
import { get } from "http";
import { useNavigate } from "react-router-dom";

export type ObjData = {
  name: string;
  url: string;
};

type NewData = {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
};

const HomePage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<ObjData[]>([]);
  const [amount, setAmount] = useState<number>(20);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(amount);
  const [num, setNum] = useState<number>(1);
  const [active, setActive] = useState<number>(num);
  const [details, setDetails] = useState<Record<string, PokeData>>({});
  const [initialData, setInitialData] = useState<ObjData[]>([]);
  const [currentSort, setCurrentSort] = useState("Lowest To Highest Number");

  const filterTypeById = (
    label: string,
    newData: ObjData[],
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const key = label.toLowerCase();
    let sorted = [...newData];

    if (key === "lowest to highest number") {
      sorted.sort(
        (a, b) =>
          +a.url.split("/").slice(-2, -1)[0] -
          +b.url.split("/").slice(-2, -1)[0]
      );
      setCurrentFilter("Lowest To Highest Number");
    } else if (key === "highest to lowest number") {
      sorted.sort(
        (a, b) =>
          +b.url.split("/").slice(-2, -1)[0] -
          +a.url.split("/").slice(-2, -1)[0]
      );
      setCurrentFilter("Highest To Lowest Number");
    } else if (key === "a-z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      setCurrentFilter("A-Z");
    } else if (key === "z-a") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      setCurrentFilter("Z-A");
    }
    setNum(1);
    setActive(1);
    setStartIndex(0);
    setEndIndex(amount);
    setData(sorted);
  };

  const handleFilterClick = async (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdownOne: boolean,
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
    label: string
  ) => {
    const selected = evt.currentTarget.innerText.toLowerCase();
    if (dropdownOne && selected !== "all types") {
      try {
        const json = await axios.get<NewData>(
          `https://pokeapi.co/api/v2/type/${selected}`
        );
        const newData1 = json.data.pokemon.map((p) => p.pokemon);
        const newData = newData1.filter((p) => {
          const id = p.url.split("/")[p.url.split("/").length - 2];
          return Number(id) < 900;
        });
        filterTypeById(currentSort, newData, setCurrentFilter);
        setCurrentFilter(
          selected.slice(0, 1).toUpperCase() + selected.slice(1)
        );
        setNum(1);
        setActive(1);
        setStartIndex(0);
        setEndIndex(amount);
      } catch (err) {
        console.error(err);
        return navigate("/404");
      }
    } else if (dropdownOne && selected === "all types") {
      setCurrentFilter("All Types");
      filterTypeById(label, initialData, setCurrentFilter);
      setNum(1);
      setActive(1);
      setStartIndex(0);
      setEndIndex(amount);
    } else if (!dropdownOne) {
      setCurrentSort(label);
      filterTypeById(label, data, setCurrentFilter);
      setNum(1);
      setActive(1);
      setStartIndex(0);
      setEndIndex(amount);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await axios.get<{ results: ObjData[] }>(
          "https://pokeapi.co/api/v2/pokemon?limit=900"
        );
        setData(json.data.results);
        setInitialData(json.data.results);
      } catch (err: any) {
        console.error(err);
        return navigate("/404");
      }
    };
    fetchData();
  }, [setData]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const currentPage = data.slice(startIndex, endIndex);

        const detailPromises = currentPage.map(async (pokemon: ObjData) => {
          const pokeData = await axios.get<PokeData>(pokemon.url);
          return { name: pokemon.name, data: pokeData.data };
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
        return navigate("/404");
      }
    };

    fetchDetails();
  }, [startIndex, endIndex, data]);

  return (
    <div className={styles.content}>
      <Header
        setAmount={setAmount}
        amount={amount}
        data={data}
        setData={setData}
        setNum={setNum}
        setActive={setActive}
        setStartIndex={setStartIndex}
        setEndIndex={setEndIndex}
        initialData={initialData}
        handleClick={handleFilterClick}
      />
      <Main
        amount={amount}
        setStartIndex={setStartIndex}
        startIndex={startIndex}
        data={data}
        num={num}
        setNum={setNum}
        active={active}
        setActive={setActive}
        endIndex={endIndex}
        setEndIndex={setEndIndex}
        details={details}
      />
    </div>
  );
};

export default HomePage;
