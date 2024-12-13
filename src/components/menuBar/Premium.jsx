import { Link } from "react-router-dom"
import classes from "./Premium.module.css"

function Premium({ onUpgrade }) {
  return (
    <div className={classes.banner}>
      <img src="/banner/upgrade.png" className={classes.bannerImage} />
      <p className={classes.bannerText}>Upgrade your Account to Get Free Voucher</p>
      <button className={classes.bannerButton} onClick={onUpgrade}>Upgrade</button>
    </div>
  )
}

export default Premium