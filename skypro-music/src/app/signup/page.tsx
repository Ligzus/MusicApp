import styles from "./page.module.css";

export default function signup() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
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
              className={`${styles.modalInput} ${styles.passwordFirst}`}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <input
              className={`${styles.modalInput} ${styles.passwordDouble}`}
              type="password"
              name="password"
              placeholder="Повторите пароль"
            />
            <button className={styles.modalBtnSignupEnt}>
              <a href="../index.html">Зарегистрироваться</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
