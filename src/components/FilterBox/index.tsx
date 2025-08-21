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
  const isActive = currentFilter === label ? styles.active : "";
  const isLong = !dropdown1 ? styles.long : "";

  return (
    <div
      key={label}
      className={`${styles.box} ${isLong} ${isActive}`}
      tabIndex={0}
      onClick={(e) => {
        handleClick(e, dropdown1, setCurrentFilter, label);
      }}
    >
      {label}
    </div>
  );
};

export default FilterBox;
