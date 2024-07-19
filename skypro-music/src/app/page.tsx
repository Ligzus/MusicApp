import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Nav from "@/components/Nav/Nav";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Player from "@/components/Player/Player";
import { CurrentTrackProvider } from "@/contexts/CurrentTrackProvider";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* <CurrentTrackProvider> */}
        <main className={styles.main}>
          <Nav />
          <CenterBlock />
          <Sidebar />
        </main>
        <Player />
        {/* </CurrentTrackProvider> */}
        <footer className="footer" />
      </div>
    </div>
  );
}
