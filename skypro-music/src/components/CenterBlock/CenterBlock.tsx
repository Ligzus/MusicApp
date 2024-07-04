import Filter from "../Filter/Filter";
import Playlist from "../Playlist/Playlist";
import Search from "../Search/Search";
import styles from "../CenterBlock/CenterBlock.module.css";

const CenterBlock = () => {
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter />
      <Playlist />
    </div>
  );
};

export default CenterBlock;
