import Address from "../sideBar/address/Address"
import Balance from "../sideBar/balance/Balance"
import Card from "../sideBar/card/Card"
import classes from "./StatusSidebar.module.css"

function StatusSidebar() {
  return (
    <div className={classes.container}>
      <Balance />

      <Address />

      <Card />

      

    </div>
  )
}

export default StatusSidebar