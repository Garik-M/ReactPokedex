import { useEffect, useRef, useState } from "react";
import styles from "./ListAmount.module.scss";

type Props = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const ListNum = ({
  amount,
  setAmount,
  setStartIndex,
  setEndIndex,
  setNum,
  setActive,
}: Props) => {
  const options = [10, 20, 50];
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const amounts = options.map((num) => (
    <div
      key={num}
      className={`${styles.box} ${amount === num ? styles.active : ""}`}
      onClick={() => {
        setAmount(num);
        setStartIndex(0);
        setEndIndex(amount);
        setNum(1);
        setActive(1);
      }}
    >
      {num}
    </div>
  ));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <div>
        <p>Show per page:</p>
      </div>
      <div
        className={`${styles.dropdown} ${isOpen ? styles.isOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        <p>{amount}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className={styles.arrow}
        >
          <path d="m5 3 3.057-3L20 12 8.057 24 5 21l9-9z"></path>
        </svg>
        <div className={`${styles.wrapper} ${isOpen ? styles.open : ""}`}>
          {amounts}
        </div>
      </div>
    </div>
  );
};

export default ListNum;
