import FavoriteList from "../favorite_list/FavoriteList"
import Header from "../home_header/Header"
import OfferBanner from "../offer_banner/OfferBanner"
import classes from "./FavoritePage.module.css"

function FavoritePage() {
  return (
    <div className={classes.container}>
      <Header />
      <OfferBanner />
      {/* <h4 className={classes.favoriteTitle} style={{ fontWeight: "700", fontSize: "1.5rem", paddingLeft: "2.5rem"}}>Your Favorite List</h4> */}
      <h3 className={classes.favoriteTitle}>Your favorite list</h3>
      <FavoriteList />
    </div>
  )
}

export default FavoritePage