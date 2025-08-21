import { useState } from "react";
import styles from "./Pagination.module.scss";
import { time } from "console";

type Prop = {
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
  startIndex: number;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};
let timeOut: NodeJS.Timeout;
const handleClick = (
  evt: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  setStartIndex: React.Dispatch<React.SetStateAction<number>>,
  amount: number,
  setEndIndex: React.Dispatch<React.SetStateAction<number>>,
  num: number,
  setNum: React.Dispatch<React.SetStateAction<number>>
) => {
  const numOne = Number(evt.currentTarget.innerHTML);
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    setStartIndex((numOne - 1) * amount);
    setEndIndex(numOne * amount);
  }, 500);
  if (numOne > num + 3 && (num + 3) * amount < 900 - amount) {
    if ((num + 3) * amount >= 900 - 4 * amount) {
      setNum(num);
    } else {
      setNum(num + 2);
    }
  } else if (numOne < num + 2) {
    if (num <= 2) {
      setNum(1);
    } else {
      setNum(num - 2);
    }
  }
};
const handleNextPrevClick = (
  e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  setStartIndex: React.Dispatch<React.SetStateAction<number>>,
  setEndIndex: React.Dispatch<React.SetStateAction<number>>,
  startIndex: number,
  amount: number,
  setNum: React.Dispatch<React.SetStateAction<number>>,
  num: number,
  setActive: React.Dispatch<React.SetStateAction<number>>,
  active: number
) => {
  if (e.currentTarget.innerHTML === "←") {
    if (num >= 1 || active > 1) {
      if (active > 1 && num === 1) {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
          setStartIndex(startIndex - amount);
          setEndIndex(startIndex);
        }, 500);
        setNum(num);
        setActive(active - 1);
      } else if (num > 1) {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
          setStartIndex(startIndex - amount);
          setEndIndex(startIndex);
        }, 500);
        setNum(num - 1);
        setActive(active - 1);
      }
    }
  } else {
    if ((num + 6) * amount < 900 && active !== num + 6) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        setStartIndex(startIndex + amount);
        setEndIndex(startIndex + amount * 2);
      }, 500);
      setNum(num + 1);
      setActive(active + 1);
    } else if ((num + 6) * amount === 900 && active !== num + 6) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        setStartIndex(startIndex + amount);
        setEndIndex(startIndex + amount * 2);
      }, 500);
      setActive(active + 1);
    }
  }
};

const Pagination = ({
  setStartIndex,
  amount,
  setEndIndex,
  startIndex,
  num,
  setNum,
  active,
  setActive,
}: Prop) => {
  const pageOffsets = [0, 1, 2, 3, 4, 5, 6];

  const boxes = pageOffsets.map((offset) => {
    const pageNum = num + offset;
    return (
      <div
        key={offset}
        className={`${styles.box} ${active === pageNum ? styles.active : ""}`}
        onClick={(e) => {
          setActive(pageNum);
          handleClick(e, setStartIndex, amount, setEndIndex, num, setNum);
        }}
      >
        {pageNum}
      </div>
    );
  });
  
  return (
    <div className={styles.pagination}>
      <div className={styles.container}>
        <div
          className={styles.prev_next}
          onClick={(e) =>
            handleNextPrevClick(
              e,
              setStartIndex,
              setEndIndex,
              startIndex,
              amount,
              setNum,
              num,
              setActive,
              active
            )
          }
        >
          ←
        </div>
        {boxes}
        <div
          className={styles.prev_next}
          onClick={(e) =>
            handleNextPrevClick(
              e,
              setStartIndex,
              setEndIndex,
              startIndex,
              amount,
              setNum,
              num,
              setActive,
              active
            )
          }
        >
          →
        </div>
      </div>
    </div>
  );
};
export default Pagination;
