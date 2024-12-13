import { Outlet, useLoaderData } from "react-router-dom"
import classes from "./Layout.module.css"
import Menu from "./MenuSidebar"
import StatusSidebar from "./StatusSidebar"
import queryClient from "../../query_client/queryClient"
import store, { dataActions } from "../../store/dataRedux"
import { sendHttp } from "../../http/sendHttp"
import { useContext, useEffect } from "react"
import { getUserCtx } from "../../store/userContext"
import { useDispatch } from "react-redux"

function Layout() {
    const loaderData = useLoaderData()
    const userCtx = useContext(getUserCtx())
    const dispatch = useDispatch()

    useEffect(()=> {
        userCtx.changeAddress(loaderData.user.address)
        userCtx.changeAddressDetail(loaderData.user.addressDetail)
        userCtx.changeBalance(loaderData.user.balance)
        userCtx.toggleIsPremium(loaderData.user.isPremium)
        userCtx.changeUsername(loaderData.user.name)
        dispatch(dataActions.addRecentOrders(loaderData.user.recentOrder))
        dispatch(dataActions.addAllFavorite(loaderData.user.favorite))
    }, [loaderData])

    return (
        <div className={classes.container}>
            <div className={classes.menu}><Menu /></div>
            <div className={classes.mainContent}><Outlet /></div>
            <div className={classes.statusSidebar}><StatusSidebar /></div>
        </div>
    )
}

export default Layout

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
    const reduxData = store.getState();
    const name = reduxData.data.userName;

    const data = await queryClient.fetchQuery({
        queryKey: ["name", "balance", "isPremium", "address", "addressDetail"],
        queryFn: () => sendHttp("http://localhost:3000/users", `name=${name}`),
        staleTime: 10 * 60 * 1000,
    });

    if (!data) {
        throw new Error("user not found!");
    }

    return data;
};
