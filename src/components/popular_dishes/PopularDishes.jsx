// import { useSelector } from "react-redux"
import classes from "./PopularDishes.module.css"
// import FoodItem from "../food_item/FoodItem"
import { useState } from "react"
import PageList from "../page_list/PageList"

function PopularDishes() {
  // const foods = useSelector(state => state.data.foods)
  const [maximizeDishes, setMaximizeDishes] = useState(false)
  const toggleMaximizeDishes = ()=>{
    setMaximizeDishes(prevValue => prevValue ? false : true)
  }

  return (
    <div className={classes.popularDishes}>
      <div className={classes.categoryText}>
        <h3>Popular Dishes</h3>
        <div onClick={toggleMaximizeDishes}>
          <span>{maximizeDishes ? "Show Less" : "Show All"}</span>
          <img src="/yellow_arrow.svg" />
        </div>
      </div>
      <PageList 
        filterBy="isPopular"
        heightPerRow={20}
        isMaximized={maximizeDishes}
        minHeight={16}
      />
    </div>
  )
}

export default PopularDishes