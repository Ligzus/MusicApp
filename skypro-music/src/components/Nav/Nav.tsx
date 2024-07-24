"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/store/features/userSlice";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const navToSignin = () => {
    router.push("signin")
  }

  const navLogout = () => {
    if (user) {
      dispatch(logout());
    }
  }

  const navToFavotiteTracks = () => {
    router.push("favorite")
  }

  const navToMain = () => {
    router.push("/")
  }

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="logo"
          width={114}
          height={17}
        />
      </div>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpen && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink} onClick={navToMain}>
                Главное
              </a>
            </li>
            {user.username 
              ? <li className={styles.menuItem} onClick={navToFavotiteTracks}>
                  <a href="#" className={styles.menuLink}>
                    Мой плейлист
                  </a>
                </li>

              : null  
              }
            <li className={styles.menuItem} onClick={user ? navToSignin : navLogout}>
              <a href="#" className={styles.menuLink}>
                {user.username ? "Выйти" : "Войти"}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
