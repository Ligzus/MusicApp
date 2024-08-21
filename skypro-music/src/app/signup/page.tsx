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
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateEmail = (email: string) => {
    if (!email.includes("@")) {
      return "Почта должна содержать '@'.";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.";
    }
    if (/^\d+$/.test(password)) {
      return "Введённый пароль состоит только из цифр.";
    }
    const commonPasswords = ["password", "qwerty12", "qaz12345"];
    if (commonPasswords.includes(password)) {
      return "Введённый пароль слишком широко распространён.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    try {
      await dispatch(register({ email, password, username })).unwrap();
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        let errorMessage = error.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} onSubmit={handleSubmit}>
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
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button className={styles.modalBtnSignupEnt} type="submit">
              <a>Зарегистрироваться</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
