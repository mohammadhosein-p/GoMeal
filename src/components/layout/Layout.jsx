import { Outlet } from "react-router-dom"
import classes from "./Layout.module.css"
import Menu from "./MenuSidebar"
import StatusSidebar from "./StatusSidebar"

function Layout() {
    return (
        <div className={classes.container}>
            <div className={classes.menu}><Menu /></div>
            <div className={classes.mainContent}><Outlet /></div>
            <div className={classes.statusSidebar}><StatusSidebar /></div>
        </div>
    )
}

export default Layout