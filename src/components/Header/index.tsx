import Form from "components/Form";
import Filter from "components/Filter";
import ListNum from "components/ListAmount";
import styles from "./Header.module.scss";
import { ObjData } from "page/Home";
import { useState } from "react";
import { typeOptions, sortOptions } from "utils";

type Props = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  data: ObjData[];
  setData: React.Dispatch<React.SetStateAction<ObjData[]>>;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
  initialData: ObjData[];
  handleClick: (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdownOne: boolean,
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
    label: string
  ) => Promise<void>;
};

const Header = ({
  amount,
  setAmount,
  setData,
  setNum,
  setActive,
  setStartIndex,
  setEndIndex,
  initialData,
  handleClick,
}: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const fetchDetails = async () => {
      const dataTwo = initialData.filter((obj: ObjData) => {
        return obj.name.search(text.toLowerCase()) !== -1;
      });
      if (dataTwo.length) {
        setData(dataTwo);
      } else {
        setData(initialData);
      }
    };
    fetchDetails();
    setNum(1);
    setActive(1);
    setStartIndex(0);
    setEndIndex(amount);
  };

  return (
    <>
      <div className={styles.tagline}>Pokédex</div>
      <div className={styles.header}>
        <div className={styles.filters}>
          <Form text={text} setText={setText} handleSubmit={handleSubmit} />
          <div className={styles.filter_divs}>
            <Filter
              text="All Types"
              dropdownOne={true}
              typeOptions={typeOptions}
              handleClick={handleClick}
            />
            <Filter
              text="Lowest To Highest Number"
              dropdownOne={false}
              typeOptions={sortOptions}
              handleClick={handleClick}
            />
          </div>
        </div>
        <div>
          <ListNum
            amount={amount}
            setAmount={setAmount}
            setStartIndex={setStartIndex}
            setEndIndex={setEndIndex}
            setNum={setNum}
            setActive={setActive}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
