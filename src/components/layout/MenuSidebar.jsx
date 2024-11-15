import { Link, useLocation } from "react-router-dom";
import classes from "./MenuSidebar.module.css";

const MenuList = [
  { title: "Dashboard", icon: "dashboard", link: "/" },
  { title: "Food Order", icon: "foods", link: "/food" },
  { title: "Favorite", icon: "favorite", link: "/favorite" },
  { title: "Message", icon: "message", link: "/message" },
  { title: "About", icon: "about", link: "/about" },
];

function Menu() {
  const location = useLocation();

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <span style={{ color: "black" }}>GoMeal</span>
        <span style={{ color: '#F8B602' }}>.</span>
      </div>

      <ul className={classes.menuContainer}>
        {MenuList.map((item) => (
          <li key={item.title}>
            <Link
              to={item.link}
              className={`${classes.listItem} ${location.pathname === item.link ? classes.active : ""}`}
            >
              <img
                src={`/menuIcon/${item.icon}.svg`}
                alt={item.title}
                style={{ width: "30px", color: location==item.link ? "white" : "#A098AE" }}
              />
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>

      <div className={classes.banner}>
        <img src="/banner/upgrade.png" className={classes.bannerImage} />
        <p className={classes.bannerText}>Upgrade your Account to Get Free Voucher</p>
        <Link to='/premium' className={classes.bannerButton}>Upgrade</Link>
      </div>
    </div>
  );
}

export default Menu;
