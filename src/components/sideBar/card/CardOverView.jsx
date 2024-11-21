import { useSelector } from "react-redux"
import classes from "./Card.module.css"


function CardOverView() {
  const cardList = useSelector(state => state.data.card)
	return (
		<ul className={classes.cardUl}>
			{cardList.map(item => <li key={item.title} className={classes.cardLi}>
				<img src={item.image} />
				<div className={classes.cardLiDetail}>
					<h4>{item.title}</h4>
					<p>x{item.count}</p>
				</div>
				<span className="price">+<span style={{ color: "#F8B602" }}>$</span>{(item.price * item.count).toFixed(2)}</span>
			</li>)}
		</ul>
	)
}

export default CardOverView