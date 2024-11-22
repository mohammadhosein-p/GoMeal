import { useSelector } from "react-redux"
import classes from "./Category.module.css"
import { useState } from "react"

function Category() {
  const categories = useSelector(state => state.data.category)
  const [isViewAllEnabled, setViewAll] = useState(false)

  const toggleViewAll = () =>{
    setViewAll(prevValue => prevValue ? false : true)
  }

  return (
    <div className="category">
      <div className={classes.categoryText}>
        <h3>Category</h3>
        <div onClick={toggleViewAll}>
          <span>{isViewAllEnabled ? "View Less" : "View all"}</span>
          <img src="/yellow_arrow.svg" />
        </div>
      </div>
      <ul className={`${classes.categoriesContainer} ${ isViewAllEnabled && classes.categoriesContainerMaxed}`}>
        {categories.map(item => <li key={item.title}>
          <img src={item.image} />
          <span>{item.title}</span>
        </li>
        )}
      </ul>
    </div>
  )
}

export default Category