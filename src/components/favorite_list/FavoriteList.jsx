import { useSelector } from "react-redux"
import classes from "./FavoriteList.module.css"
import FoodItem from "../food_item/FoodItem"

function FavoriteList() {
  const foods = useSelector(state => state.data.foods)
  return (
    <ul className={classes.card} style={{ maxHeight: `${Math.ceil(foods.length / 3) * 20}rem`}} >
      {foods.filter(food => food.isFavorite).map(food => (
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
  )
}

export default FavoriteList