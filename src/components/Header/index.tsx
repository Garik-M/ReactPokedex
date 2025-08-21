import Form from "../Form";
import Filter from "../Filter";
import ListNum from "../ListAmount";
import styles from "./Header.module.scss";
import { ObjData } from "../../page/Home";
import { useState } from "react";

type Props = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  data: ObjData[];
  setData: React.Dispatch<React.SetStateAction<ObjData[]>>;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
};

type NewData = {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
};

const Header = ({
  amount,
  setAmount,
  data,
  setData,
  setNum,
  setActive,
  setStartIndex,
  setEndIndex,
}: Props) => {
  const [text, setText] = useState("");
  const [currentSort, setCurrentSort] = useState("Lowest To Highest Number");

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const fetchDetails = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=900");
      const json = await res.json();
      const data1 = json.results;
      const data2 = data1.filter((obj: ObjData) => {
        return obj.name.search(text.toLowerCase()) !== -1;
      });
      if (data2.length) {
        setData(data2);
      } else {
        setData(data1);
      }
    };
    fetchDetails();
    setText("");
    setNum(1);
    setActive(1);
    setStartIndex(0);
    setEndIndex(amount);
  };

  const typeOptions = [
    "All Types",
    "Fighting",
    "Poison",
    "Rock",
    "Ghost",
    "Fire",
    "Grass",
    "Psychic",
    "Dragon",
    "Fairy",
    "Normal",
    "Flying",
    "Ground",
    "Bug",
    "Steel",
    "Water",
    "Electric",
    "Ice",
    "Dark",
    "Shadow",
  ];

  const sortOptions = [
    "Lowest To Highest Number",
    "Highest To Lowest Number",
    "A-Z",
    "Z-A",
  ];

  const filterTypeId = (
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

  const handleClick = async (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdown1: boolean,
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
    label: string
  ) => {
    const selected = evt.currentTarget.innerText.toLowerCase();
    if (dropdown1 && selected !== "all types") {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${selected}`);
        const json: NewData = await res.json();
        const newData1 = json.pokemon.map((p) => p.pokemon);
        const newData = newData1.filter((p) => {
          const id = p.url.split("/")[p.url.split("/").length - 2];
          return Number(id) < 900;
        });
        filterTypeId(currentSort, newData, setCurrentFilter);
        setCurrentFilter(
          selected.slice(0, 1).toUpperCase() + selected.slice(1)
        );
        setNum(1);
        setActive(1);
        setStartIndex(0);
        setEndIndex(amount);
      } catch (err) {
        console.error("Error fetching type:", err);
      }
    } else if (dropdown1 && selected === "all types") {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=900");
      const json = await res.json();
      const newData = json.results;
      setCurrentFilter("All Types");
      filterTypeId(label, newData, setCurrentFilter);
      setNum(1);
      setActive(1);
      setStartIndex(0);
      setEndIndex(amount);
    } else if (!dropdown1) {
      setCurrentSort(label);
      filterTypeId(label, data, setCurrentFilter);
      setNum(1);
      setActive(1);
      setStartIndex(0);
      setEndIndex(amount);
    }
  };

  const filterProps = {
    typeOptions,
    handleClick,
  };
  const ListProps = {
    setAmount,
    setStartIndex,
    setEndIndex,
    setNum,
    setActive,
  };

  return (
    <>
      <div className={styles.tagline}>Pokédex</div>
      <div className={styles.header}>
        <div className={styles.filters}>
          <Form text={text} setText={setText} handleSubmit={handleSubmit} />
          <div className={styles.filter_divs}>
            <Filter text="All Types" dropdown1={true} {...filterProps} />
            <Filter
              text="Lowest To Highest Number"
              dropdown1={false}
              {...filterProps}
            />
          </div>
        </div>
        <div>
          <ListNum amount={amount} {...ListProps} />
        </div>
      </div>
    </>
  );
};

export default Header;
