import { useLoaderData } from "react-router-dom"
import { sendHttp } from "../../http/sendHttp"
import queryClient from "../../query_client/queryClient"
import Category from "../categories/Category"
import Header from "../home_header/Header"
import OfferBanner from "../offer_banner/OfferBanner"
import PopularDishes from "../popular_dishes/PopularDishes"
import RecentOrder from "../recent_order/RecentOrder"
import classes from "./HomePage.module.css"
import { useDispatch } from "react-redux"
import { dataActions } from "../../store/dataRedux"
import { useEffect } from "react"

function HomePage() {
  const data = useLoaderData()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(dataActions.addAllFood(data))
  }, [data])

  return (
    <div className={classes.container}>
      <Header />
      <OfferBanner />
      <Category />
      <PopularDishes />
      <RecentOrder />
    </div>
  )
}

export default HomePage

export const foodLoader = async () => {

  const data = await queryClient.fetchQuery({
    queryKey: ["food"],
    queryFn: () => sendHttp("http://localhost:3000/food"),
    staleTime: 60 * 60 * 1000,
  });

  if (!data) {
    throw new Error("user not found!");
  }

  return data;
}