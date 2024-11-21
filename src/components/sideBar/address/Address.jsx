import { useContext } from "react"
import classes from "./Address.module.css"
import { getUserCtx } from "../../../store/userContext"

function Address() {
  const userCtx = useContext(getUserCtx())
  return (
    <div className={classes.addressSection}>
      <h4>Your Address</h4>
      <div className={classes.addressRow}>
        <div>
          <img src="/location.svg" />
          <span>{userCtx.address}</span>
        </div>
        <button>Change</button>
      </div>
      <p className="details">{userCtx.addressDetail}</p>
      <button className={classes.editButton}>Edit details</button>
    </div>
  )
}

export default Address