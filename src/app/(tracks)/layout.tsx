import styles from "./layout.module.css";
import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Player from "@/components/Player/Player";

type TrackLayoutProps = {
  children: React.ReactNode;
};

const TrackLayout = ({ children }: TrackLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>{children}</div>
          <Sidebar />
        </main>
        <Player />
      </div>
    </div>
  );
};

export default TrackLayout;
