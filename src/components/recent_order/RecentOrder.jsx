import { useSelector } from "react-redux"
import classes from "./RecentOrder.module.css"
import RecentOrderItem from "./RecentOrderItem"
import { useState } from "react"

function RecentOrder() {
  const recentOrder = useSelector(state => state.data.recentOrder)
  const [isMaximized, setIsMaximized] = useState(false)
  const toggleMaxmize = () => { setIsMaximized(prevValue => prevValue ? false : true) }


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

      <ul className={classes.recentCard} style={{ maxHeight: isMaximized ? `${Math.ceil(recentOrder.length / 3) * 17.5}rem` : "16rem" }}>
        {recentOrder.map(order => <RecentOrderItem
          date={order.date}
          image={order.image}
          isFavorite={order.isFavorite}
          price={order.price}
          title={order.title}
          key={order.title}
        />)}
      </ul>
    </>
  )
}

export default RecentOrder