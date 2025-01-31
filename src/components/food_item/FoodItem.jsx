/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import classes from "./FoodItem.module.css"
import { dataActions } from "../../store/dataRedux"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { sendHttp } from "../../http/sendHttp"

function FoodItem({ image, stars, title, price, isFavorite, isOrdered, offerPercentage, isPopular, toggleCard, count }) {
  const dispatch = useDispatch()
  const { token, userName, favorite } = useSelector(state => state.data)

  const { mutate } = useMutation({
    mutationKey: ["favorite"],
    mutationFn: async (favoriteList) => {
      const result = await sendHttp("http://localhost:3000/favorite", { name: userName, favorite: favoriteList }, "PUT", token)
      return result
    },
    onSuccess: () => {
      dispatch(dataActions.toggleFavorite(title))
    },
    onError: (err) => {
      console.error("Failed to update favorite:", err)
    }
  })

  const toggleFavorite = () => {
    if(isFavorite) {
      const newFavorite = favorite.filter(food => food !== title)
      mutate(newFavorite)
    } else {
      mutate([...favorite, title])
    }
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

