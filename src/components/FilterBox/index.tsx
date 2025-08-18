import styles from "./FilterBox.module.scss";

type Props = {
  label: string;
  handleClick: (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdown1: boolean,
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
    idFilterText: string
  ) => Promise<void>;
  dropdown1: boolean;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
  currentFilter: string;
};

const FilterBox = ({
  label,
  handleClick,
  dropdown1,
  setCurrentFilter,
  currentFilter,
}: Props) => {
  return (
    <div
      key={label}
      className={`${styles.box} ${dropdown1 ? "" : styles.long} ${currentFilter === label ? styles.active : ""}`}
      tabIndex={0}
      onClick={(e) => {
        handleClick(e, dropdown1, setCurrentFilter, label)
      }}
    >
      {label}
    </div>
  );
};

export default FilterBox;
