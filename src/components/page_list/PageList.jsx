/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import classes from "./PageList.module.css";
import FoodItem from "../food_item/FoodItem";
import { dataActions } from "../../store/dataRedux";
import { useSearchParams } from "react-router-dom";

function PageList({ filterBy, isMaximized, minHeight, heightPerRow }) {
  const foods = useSelector((state) => state.data.foods);
  const card = useSelector((state) => state.data.card);
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const calcedFood = foods.map((food) => {
    const cardItem = card.find((elem) => elem.title=== food.title)
    if (cardItem) return { ...food, isOrdered: true, count:cardItem.count}
    else return { ...food, isOrdered:false, count: 0 };
  });


  const filteredFoods = calcedFood.filter((food) => {
    if (filterBy === "isFavorite") return food.isFavorite;
    if (filterBy === "isPopular") return food.isPopular;
    if (filterBy === "offer") return food.offerPercentage > 0;
    if (filterBy?.category) return food.category === filterBy.type;
    if (searchParams.get("filterBy")) return food.category === searchParams.get("filterBy");
    return true;
  });

  const toggleCard = (title, action) => {
    if(action == 'add') {
      dispatch(dataActions.addToCard(title))
    } else {
      dispatch(dataActions.removeFromCard(title))
    }
  }

  return (
    <ul
      className={classes.card}
      style={{
        maxHeight: isMaximized
          ? `${Math.ceil(filteredFoods.length / 3) * heightPerRow}rem`
          : `${minHeight}rem`,
      }}
    >
      {filteredFoods.map((food) => (
        <FoodItem
          image={food.image}
          isFavorite={food.isFavorite}
          isOrdered={food.isOrdered}
          count={food.count}
          toggleCard={toggleCard}
          price={food.price}
          stars={food.stars}
          title={food.title}
          key={food.title}
          isPopular={food.isPopular}
          offerPercentage={food.offerPercentage}
        />
      ))}
    </ul>
  );
}

export default PageList;
