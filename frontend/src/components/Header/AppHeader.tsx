import FilterSelect from "./FilterSelect";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import styles from "./AppHeader.module.css";
// import Navbar from "./Navbar";
// type Props = {};

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerOptions}>
        <div className={styles.aux}>
          <FilterSelect />
        </div>

        <SearchBar />

        <div className={styles.aux}>
          <UserMenu />
        </div>
      </div>
      {/* <Navbar /> */}
    </div>
  );
};

export default Header;
