import styles from "./FilterBox.module.scss";

type Props = {
  label: string;
  handleClick: (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdownOne: boolean,
    setCurrentFilter: React.Dispatch<React.SetStateAction<string>>,
    idFilterText: string
  ) => Promise<void>;
  dropdownOne: boolean;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
  currentFilter: string;
};

const FilterBox = ({
  label,
  handleClick,
  dropdownOne,
  setCurrentFilter,
  currentFilter,
}: Props) => {
  const isActive = currentFilter === label ? styles.active : "";
  const isLong = !dropdownOne ? styles.long : "";

  return (
    <div
      key={label}
      className={`${styles.box} ${isLong} ${isActive}`}
      tabIndex={0}
      onClick={(e) => {
        handleClick(e, dropdownOne, setCurrentFilter, label);
      }}
    >
      {label}
    </div>
  );
};

export default FilterBox;
