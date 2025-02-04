import Header from "../home_header/Header"
import OfferBanner from "../offer_banner/OfferBanner"
import PageList from "../page_list/PageList"
import classes from "./FavoritePage.module.css"

function FavoritePage() {
  return (
    <div className={classes.container}>
      <Header />
      <OfferBanner />
      <h3 className={classes.favoriteTitle}>Your favorite list</h3>
      <PageList 
        filterBy="isFavorite"
        heightPerRow={20}
        isMaximized={true}
        minHeight={16}
      />
    </div>
  )
}

export default FavoritePage