import Search from "@/components/Search/Search";
import styles from "./layout.module.css";
import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Player from "@/components/Player/Player";

const TrackLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            {children}
          </div>
          <Sidebar />
        </main>
        <Player />
      </div>
    </div>
  );
};

export default TrackLayout;
