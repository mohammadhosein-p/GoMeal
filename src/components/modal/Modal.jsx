/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

function Modal({ isOpen, children, onClose, className }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        modalRef.current?.close();
        onClose?.();
      }
    };

    if (isOpen) {
      modalRef.current?.showModal();
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (modalRef.current?.open) modalRef.current.close();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (event.target === modalRef.current) {
      modalRef.current?.close();
      onClose?.();
    }
  };

  return createPortal(
    <dialog
      ref={modalRef}
      className={`${classes.modal} ${className}`}
      onClick={handleClickOutside}
    >
      <button onClick={onClose} className={classes.closeButton}>
        &times;
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Modal;
