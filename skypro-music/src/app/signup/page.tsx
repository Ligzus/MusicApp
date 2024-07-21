"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { register } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ email, password, username })).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

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
              className={`${styles.modalInput} ${styles.passwordDouble}`}
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={`${styles.modalInput} ${styles.login}`}
              type="text"
              name="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={`${styles.modalInput} ${styles.passwordFirst}`}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.modalBtnSignupEnt} onClick={handleSubmit}>
              <a>Зарегистрироваться</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
