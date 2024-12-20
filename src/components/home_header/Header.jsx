import { useContext, useState } from "react"
import classes from "./Header.module.css"
import { getUserCtx } from "../../store/userContext"
import { useMutation } from "@tanstack/react-query"
import { sendHttp } from "../../http/sendHttp"
import { useDispatch, useSelector } from "react-redux"
import { dataActions } from "../../store/dataRedux"
import { useNavigate } from "react-router-dom"
import Notification from "../notification/Notification"


function Header() {
  const [isLogoutEnable, setLogoutEnable] = useState(false)
  const [notification, setNotification] = useState({ isOpen: false, text: "", title: "", type: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.data.token)
  const userCtx = useContext(getUserCtx())

  const { mutate, isError, error } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await sendHttp("http://localhost:3000/logout", "", "GET", token)
    },
    onSuccess: () => {
      dispatch(dataActions.changeToken({ token: "" }))
      dispatch(dataActions.changeUserName({ name: "" }))
      navigate("/login")
    },
    onError: err => setNotification({ isOpen: true, text: err.error, title: "error", type: "error" })
  })

  return <>
    <div className={classes.greeting}>
      <p
        onMouseEnter={() => setLogoutEnable(true)}
        onMouseLeave={() => setLogoutEnable(false)}
        onClick={mutate}
      >Hello, {userCtx.username}</p>
      <span className={classes.hoverText} style={{ display: isLogoutEnable ? "inline" : "none" }}>Click to logout</span>
      <div className={classes.search}>
        <a href="#"><img src="/search.svg" /></a>
        <input type="text" placeholder="What do you want eat today..." />
      </div>
    </div>

    <Notification
      isOpen={notification.isOpen}
      onClose={() => setNotification({ isOpen: false, text: "", title: "", type: "" })}
      text={notification.text}
      title={notification.title}
      type={notification.type}
    />
  </>
}

export default Header