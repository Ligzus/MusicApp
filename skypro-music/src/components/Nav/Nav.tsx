"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
              <a href="#" className={styles.menuLink}>
                Главное
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="../signin.html" className={styles.menuLink}>
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
