import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import { useFilters } from "../../contexts/filtersContext";

const SearchBar = () => {
  const { setFilters } = useFilters();
  const [text, setText] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: text.trim() }));
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Pesquise algo..."
          className={styles.searchbar}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <Search size={24} strokeWidth={2} color="black" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
