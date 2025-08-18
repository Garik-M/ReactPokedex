import FilterBox from "../FilterBox";
import styles from "./Filter.module.scss";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";

type FilterProps = {
  text: string;
  dropdown1: boolean;
  typeOptions: Array<string>;
  handleClick: (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdown1: boolean,
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
    idFilterText: string,
  ) => Promise<void>;
};

const Filter = ({ text, dropdown1, typeOptions, handleClick }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(text);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderItems = typeOptions.map((label) => (
    <FilterBox
      key={label}
      label={label}
      handleClick={handleClick}
      dropdown1={dropdown1}
      setCurrentFilter={setCurrentFilter}
      currentFilter={currentFilter}
    />
  ));

  return (
    <div
      className={styles.filter}
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      ref={ref}
    >
      <p id={dropdown1 ? "dropdown1Text" : "dropdown2Text"}>{currentFilter}</p>
      <Arrow className={styles.arrow}/>
      <div
        className={`${styles.dropdown1} ${!dropdown1 ? styles.dropdown2 : ""}
                    ${isOpen ? styles.open : ""}
                  `}
      >
        {renderItems}
      </div>
    </div>
  );
};

export default Filter;
