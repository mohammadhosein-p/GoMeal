/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import classes from "./Notification.module.css";

function Notification({ isOpen, onClose, title, text, type }) {
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      ref.current.style.transform = "translateY(0)";
      ref.current.style.opacity = "1";

      const timer = setTimeout(() => {
        onClose();
        ref.current.style.transform = "translateY(-100%)";
        ref.current.style.opacity = "0";
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  let backgroundColor;
  if (type === "success") {
    backgroundColor = "#007E33"
  } else if (type === "info") {
    backgroundColor = "#0099CC"
  } else if (type === "warning") {
    backgroundColor = "#FF8800"
  } else if (type === "error") {
    backgroundColor = "#CC0000"
  }

  return (
    <div
      ref={ref}
      className={`${classes.container} ${isOpen ? classes.show : classes.hide}`}
      style={{ backgroundColor }}
    >
      <h3>{title}</h3>
      <p>{text?.toString()}</p>
    </div>
  );
}

export default Notification;