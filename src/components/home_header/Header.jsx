import { useContext } from "react"
import classes from "./Header.module.css"
import { getUserCtx } from "../../store/userContext"


function Header() {
  const userCtx = useContext(getUserCtx())
  return (
    <div className={classes.greeting}>
      <span>Hello, {userCtx.username}</span>
      <div className={classes.search}>
        <a href="#"><img src="/search.svg" /></a>
        <input type="text" placeholder="What do you want eat today..." />
      </div>
    </div>
  )
}

export default Header