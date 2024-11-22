import Category from "../categories/Category"
import Header from "../home_header/Header"
import OfferBanner from "../offer_banner/OfferBanner"
import PopularDishes from "../popular_dishes/PopularDishes"
import RecentOrder from "../recent_order/RecentOrder"
import classes from "./HomePage.module.css"

function HomePage() {
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