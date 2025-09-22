import { Fragment, type ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./DialogBox.module.scss";

interface DialogueBoxProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  confirmBtnLabel?: string;
  confirmOnClick?: () => void;
  confirmBtnVariant?: "contained" | "outlined" | "text";
  closeBtnLabel?: string;
  closeOnClick?: () => void;
  closeBtnVariant?: "contained" | "outlined" | "text";
}

const DialogueBox: React.FC<DialogueBoxProps> = ({
  open,
  onClose,
  title,
  children,
  confirmBtnLabel,
  confirmOnClick,
  confirmBtnVariant = "contained",
  closeBtnLabel,
  closeBtnVariant = "contained",
  closeOnClick,
}) => {
  if (!open) return null;

  return (
    <Fragment>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FaTimes />
          </button>
        </div>
        <span className={styles.dialogDivider}></span>
        <div className={styles.dialogContent}>{children}</div>
        <div className={styles.dialogActions}>
          {confirmBtnLabel && (
            <button
              onClick={confirmOnClick}
              className={`${styles.confirmButton} ${styles[confirmBtnVariant]}`}
            >
              {confirmBtnLabel}
            </button>
          )}
          {closeBtnLabel && (
            <button
              onClick={closeOnClick}
              className={`${styles.cancelButton} ${styles[closeBtnVariant]}`}
            >
              {closeBtnLabel}
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DialogueBox;
