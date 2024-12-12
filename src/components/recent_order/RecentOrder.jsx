import { useDispatch, useSelector } from "react-redux"
import classes from "./RecentOrder.module.css"
import RecentOrderItem from "./RecentOrderItem"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { sendHttp } from "../../http/sendHttp"
import { dataActions } from "../../store/dataRedux"
import Notification from "../notification/Notification"

function RecentOrder() {
  const userName = useSelector(state => state.data.userName)
  const favorite = useSelector(state => state.data.favorite)
  const dispatch = useDispatch()
  const [isMaximized, setIsMaximized] = useState(false)
  const [hasError, setHasError] = useState(false)
  let calcedRecent
  
  const toggleMaxmize = () => { setIsMaximized(prevValue => prevValue ? false : true) }

  const {data, isError, isLoading, error} = useQuery({
    queryKey: ['recent'],
    queryFn: () => sendHttp("http://localhost:3000/recent", `name=${userName}`),
    onSuccess: data => dispatch(dataActions.addAllRecent(data.recent)),
    staleTime: 1000 * 60 * 5
  })

  
  useEffect(()=>{
    if(isError) setHasError(true)
    }, [isError])
  
  if(data) {
    calcedRecent = data?.recent.map(order => {
      const isFavorite = favorite.find(title => order.title == title)
      return { ...order, isFavorite }
    })
  }

  return (
    <>
      <div className="recent order">
        <div className={classes.categoryText}>
          <h3>Recent Order</h3>
          <div onClick={toggleMaxmize}>
            <span>{isMaximized ? "Show Less" : "Show All"}</span>
            <img src="/yellow_arrow.svg" />
          </div>
        </div>
      </div>

      {isLoading && <p style={{display: "block", textAlign: "center"}}>Fetching recent orders...</p>}

      <ul className={classes.recentCard} style={{ maxHeight: isMaximized ? `${Math.ceil(data.length / 3) * 17.5}rem` : "16rem" }}>
        {calcedRecent?.map(order => {
        const date = new Date(order.date)
        return <RecentOrderItem
          date={date}
          image={order.image}
          isFavorite={order.isFavorite}
          price={order.price}
          title={order.title}
          key={order.title}
        />})}
      </ul>

      {hasError && <Notification 
        isOpen={hasError}
        onClose={() => setHasError(false)}
        text={error}
        title="Load data failed"
        type="error"
      />}

    </>
  )
}

export default RecentOrder