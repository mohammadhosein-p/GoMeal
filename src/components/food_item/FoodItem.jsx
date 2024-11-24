/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import classes from "./FoodItem.module.css"
import { dataActions } from "../../store/dataRedux"

function FoodItem({ image, stars, title, price, isFavorite, isOrdered, offerPercentage, isPopular, toggleCard, count }) {
  const dispatch = useDispatch()
  const toggleFavorite = () => {
    dispatch(dataActions.toggleFavorite(title))
  }
  
  return (
    <li className={classes.cardLi}>
      <div onClick={toggleFavorite}>
        <img src={isFavorite ? "/card/red_heart.svg" : "/card/gray_heart.svg"} className={classes.favoriteIcon} />
      </div>
      <img src={image} className={classes.foodImage} />
      {isPopular && <span className={classes.cardOffer}>{offerPercentage}% Off</span>}
      <div className="stars">
        {Array.from({length: stars}, (_,index)=> <img src="/card/star.svg" key={index} />)}
      </div>
      <div className={classes.cardDetails}>
        <div>
          <span>{title}</span>
          <br />
          <span><span style={{ color: "#F8B602" }}>$</span>{price.toFixed(2)}</span>
        </div>
        <div className={classes.cardAddIcon}>
          {isOrdered ? 
            <div className={classes.changeCount}>
              <span onClick={() => toggleCard(title, "add")}>+</span>
              <span>{count}</span>
              <span onClick={() => toggleCard(title, "remove")}>-</span>
            </div> :
            <img onClick={() => toggleCard(title, "add")} src="/card/add.svg" />
          }
        </div>
      </div>
    </li>
  )
}

export default FoodItem

