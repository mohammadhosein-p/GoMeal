import { Link } from "react-router-dom"
import classes from "./Premium.module.css"

function Premium() {
  return (
    <div className={classes.banner}>
      <img src="/banner/upgrade.png" className={classes.bannerImage} />
      <p className={classes.bannerText}>Upgrade your Account to Get Free Voucher</p>
      <Link to='/premium' className={classes.bannerButton}>Upgrade</Link>
    </div>
  )
}

export default Premium