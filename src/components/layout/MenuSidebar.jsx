import { NavLink, useLocation } from "react-router-dom";
import classes from "./MenuSidebar.module.css";
import { useContext } from "react";
import { getUserCtx } from "../../store/userContext";
import Premium from "../menuBar/Premium";

const MenuList = [
  { title: "Dashboard", icon: "dashboard", link: "/" },
  { title: "Food Order", icon: "foods", link: "/food" },
  { title: "Favorite", icon: "favorite", link: "/favorite" },
  { title: "Message", icon: "message", link: "/message" },
  { title: "About", icon: "about", link: "/about" },
];

function Menu() {
  const location = useLocation();
  const userCtx = useContext(getUserCtx())

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
              className={({isActive}) => isActive ? classes.active : classes.listItem}
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

      {!userCtx.isPremium && <Premium />}
    </div>
  );
}

export default Menu;
