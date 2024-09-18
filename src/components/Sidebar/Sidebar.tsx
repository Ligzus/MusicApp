"use client";

import Image from "next/image";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/store/features/userSlice";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [isClient, setIsClient] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // Устанавливаем isClient в true только на клиентской стороне
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogoutClick = () => {
    if (user.username) {
      dispatch(logout());
    }
  };

  // Условный рендеринг в зависимости от isClient
  if (!isClient) {
    return null; // Или какой-то другой индикатор загрузки
  }

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{user.username}</p>
        <Link href="/signin/" className={styles.sidebarIcon}>
          <svg onClick={handleLogoutClick}>
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </Link>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/2">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/3">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/4">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
