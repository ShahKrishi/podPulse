import React from "react";
import styles from "./Polaroid.module.scss";
import accountLogo from "../../assets/icons/account.svg";
import calendarLogo from "../../assets/icons/calender-yellow.svg";

interface PolaroidCardProps {
  src: string;
  title: string;
  by: string;
  on: string;
  description: string;
  category: string;
  mainContainerOnClick?: React.MouseEventHandler;
}

const Polaroid: React.FC<PolaroidCardProps> = ({
  src,
  title,
  by,
  on,
  description,
  category,
  mainContainerOnClick,
}) => {
  return (
    <div className={styles.polaroid} onClick={mainContainerOnClick}>
      <div className={styles.imageWrapper}>
        <img src={src} alt={title} className={styles.image} />
        <div className={styles.category}>{category}</div>
      </div>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <img src={accountLogo} alt="Author" className={styles.icon} />
          <span>{by}</span>
        </div>
        <div className={styles.metaItem}>
          <img src={calendarLogo} alt="Date" className={styles.icon} />
          <span>{on}</span>
        </div>
      </div>
      <div className={styles.title}>{title}</div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Polaroid;
