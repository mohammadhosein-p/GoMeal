import { useDispatch } from "react-redux"
import classes from "./Category.module.css"
import { useEffect, useState } from "react"
import CategoryItem from "./CategoryItem"
import { sendHttp } from "../../http/sendHttp"
import { useQuery } from "@tanstack/react-query"
import Notification from "../notification/Notification"
import { dataActions } from "../../store/dataRedux"

function Category() {
  const dispatch = useDispatch()
  const [isViewAllEnabled, setViewAll] = useState(false)
  const [errorActive, setErrorActive] = useState(false)
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['category'],
    queryFn: () => sendHttp("http://localhost:3000/category"),
    staleTime: 60 * 60 * 1000,
    onSuccess: (data) => dispatch(dataActions.addAllCategories(data.data))
  })

  const toggleViewAll = () => {
    setViewAll(prevValue => prevValue ? false : true)
  }

  useEffect(()=>{
    if(isError) setErrorActive(true)
  }, [isError])

  
  return (
    <div className="category">
      <div className={classes.categoryText}>
        <h3>Category</h3>
        <div onClick={toggleViewAll}>
          <span>{isViewAllEnabled ? "View Less" : "View all"}</span>
          <img src="/yellow_arrow.svg" />
        </div>
      </div>
      {errorActive && <>
        <p>Fetching data failed. try again...</p>
        <Notification
          isOpen={errorActive}
          onClose={() => setErrorActive(false)}
          text={error}
          title="Error"
          type="error"
        />
      </> }
      
      {
        isLoading && <p style={{display: "block", textAlign: "center"}}>Fetching data...</p>
      }

      <ul className={classes.categoriesContainer} style={{ maxHeight: isViewAllEnabled ? "20rem" : "8rem" }}>
        {data?.data.map(item => <CategoryItem
          image={item.image}
          title={item.title}
          key={item.title}
        />)}
      </ul>

    </div>
  )
}

export default Category