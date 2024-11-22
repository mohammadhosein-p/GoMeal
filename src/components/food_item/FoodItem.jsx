/* eslint-disable react/prop-types */
import classes from "./FoodItem.module.css"

function FoodItem({ image, stars, title, price, isFavorite, isOrdered, offerPercentage, isPopular }) {
  return (
    <li className={classes.cardLi}>
      <a href="#">
        <img src={isFavorite ? "/card/red_heart.svg" : "/card/gray_heart.svg"} className={classes.favoriteIcon} />
      </a>
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
        <a href="/" className={classes.cardAddIcon}>
          <img src={isOrdered ? "/card/remove.svg" : "/card/add.svg"} style={{backgroundColor: isOrdered ? "#999" : "#F8B602"}} />
        </a>
      </div>
    </li>
  )
}

export default FoodItem

