import styles from "./Playlist.module.css";

const Playlist = () => {
  return (
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={styles.playlistTitleCol01}>Трек</div>
        <div className={styles.playlistTitleCol02}>Исполнитель</div>
        <div className={styles.playlistTitleCol03}>Альбом</div>
        <div className={styles.playlistTitleCol04}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        <div className={styles.playlistItem}>
          <div className={styles.playlistTrack}>
            <div className={styles.trackTitle}>
              <div className={styles.trackTitleImage}>
                <svg className={styles.trackTitleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-note" />
                </svg>
              </div>
              <div className="track__title-text">
                <a className={styles.trackTitleLink} href="http://">
                  Guilt <span className={styles.trackTitleSpan} />
                </a>
              </div>
            </div>
            <div className={styles.trackAuthor}>
              <a className={styles.trackAuthorLink} href="http://">
                Nero
              </a>
            </div>
            <div className={styles.trackAlbum}>
              <a className={styles.trackAlbumLink} href="http://">
                Welcome Reality
              </a>
            </div>
            <div className="track__time">
              <svg className={styles.trackTimeSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-like" />
              </svg>
              <span className={styles.trackTimeText}>4:44</span>
            </div>
          </div>
        </div>
        <div className={styles.playlistItem}>
          <div className={styles.playlistTrack}>
            <div className={styles.trackTitle}>
              <div className={styles.trackTitleImage}>
                <svg className={styles.trackTitleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-note" />
                </svg>
              </div>
              <div className="track__title-text">
                <a className={styles.trackTitleLink} href="http://">
                  Elektro <span className={styles.trackTitleSpan} />
                </a>
              </div>
            </div>
            <div className={styles.trackAuthor}>
              <a className={styles.trackAuthorLink} href="http://">
                Dynoro, Outwork, Mr. Gee
              </a>
            </div>
            <div className={styles.trackAlbum}>
              <a className={styles.trackAlbumLink} href="http://">
                Elektro
              </a>
            </div>
            <div className="track__time">
              <svg className={styles.trackTimeSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-like" />
              </svg>
              <span className={styles.trackTimeText}>2:22</span>
            </div>
          </div>
        </div>
        <div className={styles.playlistItem}>
          <div className={styles.playlistTrack}>
            <div className={styles.trackTitle}>
              <div className={styles.trackTitleImage}>
                <svg className={styles.trackTitleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-note" />
                </svg>
              </div>
              <div className="track__title-text">
                <a className={styles.trackTitleLink} href="http://">
                  I’m Fire <span className={styles.trackTitleSpan} />
                </a>
              </div>
            </div>
            <div className={styles.trackAuthor}>
              <a className={styles.trackAuthorLink} href="http://">
                Ali Bakgor
              </a>
            </div>
            <div className={styles.trackAlbum}>
              <a className={styles.trackAlbumLink} href="http://">
                I’m Fire
              </a>
            </div>
            <div className="track__time">
              <svg className={styles.trackTimeSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-like" />
              </svg>
              <span className={styles.trackTimeText}>2:22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
