import { useSelector } from "react-redux"
import classes from "./PopularDishes.module.css"
import FoodItem from "../food_item/FoodItem"
import { useState } from "react"

function PopularDishes() {
  const foods = useSelector(state => state.data.foods)
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
      <ul className={classes.card} style={{ maxHeight: maximizeDishes ? `${Math.ceil(foods.length / 3) * 20}rem` : "16rem" }} >
        {foods.filter(food => food.isPopular).map(food => (
          <FoodItem
            image={food.image}
            isFavorite={food.isFavorite}
            isOrdered={true}
            price={food.price}
            stars={food.stars}
            title={food.title}
            key={food.title}
            isPopular={food.isPopular}
            offerPercentage={food.offerPercentage}
          />
        ))}
      </ul>
    </div>
  )
}

export default PopularDishes