import { useState } from "react";

import Header from "../../components/Header";
import Main from "../../components/Main";

import styles from "./Home.module.scss";

export type ObjData = {
  name: string;
  url: string;
};

const HomePage = () => {
  const [data, setData] = useState<ObjData[]>([]);
  const [amount, setAmount] = useState<number>(20);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState(amount);
  const [num, setNum] = useState(1);
  const [active, setActive] = useState(num);

  const props = {
    amount,
    data,
    setData,
    setNum,
    setActive,
    setStartIndex,
    setEndIndex,
  };

  return (
    <div className={styles.content}>
      <Header setAmount={setAmount} {...props} />
      <Main
        {...props}
        startIndex={startIndex}
        num={num}
        active={active}
        endIndex={endIndex}
      />
    </div>
  );
};

export default HomePage;
