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
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(amount);
  const [num, setNum] = useState(1);
  const [active, setActive] = useState(num);

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
      />
      <Main
        amount={amount}
        setStartIndex={setStartIndex}
        startIndex={startIndex}
        data={data}
        setData={setData}
        num={num}
        setNum={setNum}
        active={active}
        setActive={setActive}
        endIndex={endIndex}
        setEndIndex={setEndIndex}
      />
    </div>
  );
};

export default HomePage;
