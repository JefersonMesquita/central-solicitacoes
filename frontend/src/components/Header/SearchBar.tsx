import { useRef, useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.css";
import { useFilters } from "../../contexts/filtersContext";

const SearchBar = () => {
  const { setFilters } = useFilters();
  const [text, setText] = useState("");
  const [isSearching, SetIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetIsSearching(true);
    setFilters((prev) => ({ ...prev, search: text.trim() }));
  };

  const handleClear = () => {
    setText("");
    setFilters((prev) => ({ ...prev, search: "" }));
    SetIsSearching(false);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Pesquise algo..."
          className={styles.searchbar}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {isSearching && (
          <div className={styles.searchInfo}>
            <span>pesquisando por: </span>
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Limpar pesquisa"
            >
              {text}
              <X size={20} />
            </button>
          </div>
        )}
        <button type="submit" className={styles.searchButton}>
          <Search size={24} strokeWidth={2} color="black" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
