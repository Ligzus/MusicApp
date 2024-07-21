import Link from "next/link";
import styles from "./page.module.css";

export default function signup() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <a href="../">
              <div className={styles.modalLogo}>
                <img src="../img/logo_modal.png" alt="logo" />
              </div>
            </a>
            <input
              className={`${styles.modalInput} ${styles.login}`}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              className={`${styles.modalInput} ${styles.password}`}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button className={styles.modalBtnEnter}>
              <a href="../index.html">Войти</a>
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
