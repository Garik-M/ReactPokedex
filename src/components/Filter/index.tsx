import FilterBox from "../FilterBox";
import styles from "./Filter.module.scss";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";

type FilterProps = {
  text: string;
  dropdownOne: boolean;
  typeOptions: Array<string>;
  handleClick: (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdownOne: boolean,
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
    idFilterText: string
  ) => Promise<void>;
};

const Filter = ({ text, dropdownOne, typeOptions, handleClick }: FilterProps) => {
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
    <FilterBox key={label} label={label} handleClick={handleClick}
    dropdownOne={dropdownOne}
    setCurrentFilter={setCurrentFilter}
    currentFilter={currentFilter} />
  ));

  const filterId = dropdownOne ? "dropdownOneText" : "dropdownTwoText";

  const classes = `${styles.dropdownOne} ${!dropdownOne ? styles.dropdownTwo : ""}
                    ${isOpen ? styles.open : ""}
                  `;

  return (
    <div
      className={styles.filter}
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      ref={ref}
    >
      <p id={filterId}>{currentFilter}</p>
      <Arrow className={styles.arrow} />
      <div className={classes}>{renderItems}</div>
    </div>
  );
};

export default Filter;
