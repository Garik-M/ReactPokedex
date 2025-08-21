import styles from "./Form.module.scss";
import { ReactComponent as SearchIcon } from "../../assets/svg/searchIcon.svg";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ text, setText, handleSubmit }: Props) => {
  return (
    <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
      <input
        className={styles.search}
        id="input"
        type="search"
        placeholder="Search by name"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <button className={styles.submit}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default Form;
