import { useContext } from "react"
import classes from "./Balance.module.css"
import { getUserCtx } from "../../../store/userContext"

function Balance() {
  const userCtx = useContext(getUserCtx())
  return (
    <>
      <h3 style={{ color: "#333" }}>Your Balance</h3>
      <div className={classes.balance}>
        <img src="/banner/balance.png" className={classes.balanceImage} />
        <div className={classes.balanceCurrent}>
          <span style={{ fontSize: "1rem", color: "#666" }}>Balance</span>
          <br />
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>${userCtx.balance.toFixed(2)}</span>
        </div>
        <div className={classes.topupSection} >
          <img className={classes.topupIcon} src="/balance/import.svg" />
          <p className={classes.topupText}>TopUp</p>
        </div>
        <div className={classes.transferSection}>
          <img src="/balance/export.svg" className={classes.topupIcon} />
          <p className={classes.topupText}>Transfer</p>
        </div>
      </div>
    </>
  )
}

export default Balance