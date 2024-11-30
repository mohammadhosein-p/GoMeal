/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

function Modal({ isOpen, children, onClose, className }) {
  const modalRef = useRef()
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        modalRef.current.close()
        onClose();
      }
    };

    if (isOpen) {
      modalRef.current.showModal()
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      modalRef.current.close()
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen])

  return createPortal(
    <dialog ref={modalRef} className={`${classes.modal} ${className}`}>
      <button onClick={onClose} className={classes.closeButton}>
        &times;
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Modal;

