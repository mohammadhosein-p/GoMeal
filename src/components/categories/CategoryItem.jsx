/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import classes from "./Category.module.css"

function CategoryItem({ image, title }) {
  return (
    <li style={{userSelect: "none"}}>
      <Link className={classes.categoryItem} to={`/food?filterBy=${title.toLowerCase()}`}>
        <img src={image} />
        <span>{title}</span>
      </Link>
    </li>)
}

export default CategoryItem