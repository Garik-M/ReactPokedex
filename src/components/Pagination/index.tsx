import { ObjData } from "page/Home";
import styles from "./Pagination.module.scss";

type Prop = {
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
  startIndex: number;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  data: ObjData[];
};

let timeOut: NodeJS.Timeout;

const handleClick = (
  evt: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  setStartIndex: React.Dispatch<React.SetStateAction<number>>,
  amount: number,
  setEndIndex: React.Dispatch<React.SetStateAction<number>>,
  num: number,
  setNum: React.Dispatch<React.SetStateAction<number>>,
  setActive: React.Dispatch<React.SetStateAction<number>>,
  data: ObjData[]
) => {
  const pageNum = Number(evt.currentTarget.innerHTML);
  if (!Number.isFinite(pageNum)) return;

  const totalPages = Math.ceil(data.length / amount);
  const windowSize = 7;
  const middleIndex = Math.floor(windowSize / 2); // 3

  setActive(pageNum);

  const newStart = (pageNum - 1) * amount;
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    setStartIndex(newStart);
    setEndIndex(newStart + amount);
  }, 0);

  if (pageNum > num + middleIndex && num + windowSize <= totalPages) {
    setNum(Math.min(pageNum - middleIndex, totalPages - windowSize + 1));
  } else if (pageNum < num + middleIndex) {
    setNum(Math.max(pageNum - middleIndex, 1));
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
  active: number,
  data: ObjData[]
) => {
  const totalPages = Math.ceil(data.length / amount);
  const windowSize = 7;
  const middleIndex = Math.floor(windowSize / 2);

  let newPage = active;

  if (e.currentTarget.innerHTML === "←" && active > 1) {
    newPage = active - 1;
  } else if (e.currentTarget.innerHTML === "→" && active < totalPages) {
    newPage = active + 1;
  } else {
    return;
  }

  setActive(newPage);

  const newStart = (newPage - 1) * amount;
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    setStartIndex(newStart);
    setEndIndex(newStart + amount);
  }, 0);

  if (newPage > num + middleIndex && num + windowSize <= totalPages) {
    setNum(Math.min(newPage - middleIndex, totalPages - windowSize + 1));
  } else if (newPage < num + middleIndex) {
    setNum(Math.max(newPage - middleIndex, 1));
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
  data,
}: Prop) => {
  const pageOffsets = [0, 1, 2, 3, 4, 5, 6];
  const totalPages = Math.ceil(data.length / amount);

  const boxes = pageOffsets.map((offset) => {
    const pageNum = num + offset;
    if (pageNum > totalPages) return null;

    return (
      <div
        key={offset}
        className={`${styles.box} ${active === pageNum ? styles.active : ""}`}
        onClick={(e) =>
          handleClick(e, setStartIndex, amount, setEndIndex, num, setNum, setActive, data)
        }
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
            handleNextPrevClick(e, setStartIndex, setEndIndex, startIndex, amount, setNum, num, setActive, active, data)
          }
        >
          ←
        </div>
        {boxes}
        <div
          className={styles.prev_next}
          onClick={(e) =>
            handleNextPrevClick(e, setStartIndex, setEndIndex, startIndex, amount, setNum, num, setActive, active, data)
          }
        >
          →
        </div>
      </div>
    </div>
  );
};

export default Pagination;