import { NavLink, useLocation } from "react-router-dom";
import classes from "./MenuSidebar.module.css";
import { useContext, useState } from "react";
import { getUserCtx } from "../../store/userContext";
import Premium from "../menuBar/Premium";
import Modal from "../modal/Modal";
import { useMutation } from "@tanstack/react-query";
import { sendHttp } from "../../http/sendHttp";
import { useSelector } from "react-redux";

const MenuList = [
  { title: "Dashboard", icon: "dashboard", link: "/" },
  { title: "Order Food", icon: "foods", link: "/food" },
  { title: "Favorite", icon: "favorite", link: "/favorite" },
  { title: "Contact Us", icon: "message", link: "/contact" },
  { title: "About", icon: "about", link: "/about" },
];

function Menu() {
  const token = useSelector(state => state.data.token)
  const location = useLocation();
  const userCtx = useContext(getUserCtx())
  const [isUpgradeEnabled, setUpgradeEnabled] = useState(false)

  const { mutate, error, isError, isLoading } = useMutation({
    mutationKey: ['isPremium'],
    mutationFn: () => {
      sendHttp("http://localhost:3000/premium", { name: userCtx.username }, "PUT", token)
    },
    onSuccess: () => {
      userCtx.toggleIsPremium(true)
      setUpgradeEnabled(false)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <span style={{ color: "black" }}>GoMeal</span>
        <span style={{ color: '#F8B602' }}>.</span>
      </div>

      <ul className={classes.menuContainer}>
        {MenuList.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.link}
              className={({ isActive }) => isActive ? classes.active : classes.listItem}
            >
              <img
                src={`/menuIcon/${item.icon}.svg`}
                alt={item.title}
                style={{ width: "30px", color: location == item.link ? "white" : "#A098AE" }}
              />
              <h3>{item.title}</h3>
            </NavLink>
          </li>
        ))}
      </ul>

      {!userCtx.isPremium && <Premium onUpgrade={() => setUpgradeEnabled(true)} />}

      <Modal
        isOpen={isUpgradeEnabled}
        onClose={() => setUpgradeEnabled(false)}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <h3>Are you sure you want to upgrade your account to Premium?</h3>
          <div className={classes.modalButtonContainer}>
            {isLoading ? <p>Fetching...</p> :
              <button onClick={mutate}>Upgrade</button>}
            <button onClick={() => setUpgradeEnabled(false)}>Cancel</button>
          </div>
          {isError && <span className={classes.modalError}>{error.message}</span>}
        </div>
      </Modal>

    </div>
  );
}

export default Menu;
