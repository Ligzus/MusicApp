import Filter from "../Filter/Filter";
import Playlist from "../Playlist/Playlist";
import Search from "../Search/Search";

const CenterBlock = () => {
  return (
    <div className="main__centerblock centerblock">
      <Search />
      <h2 className="centerblock__h2">Треки</h2>
      <Filter />
      <Playlist />
    </div>
  );
};

export default CenterBlock;
