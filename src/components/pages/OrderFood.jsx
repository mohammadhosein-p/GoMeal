import Header from "../home_header/Header"
import OfferBanner from "../offer_banner/OfferBanner"
import PageList from "../page_list/PageList"
import classes from "./OrderFood.module.css"


function OrderFood() {
  return (
    <div className={classes.container}>
      <Header />
      <OfferBanner />
      <h3 className={classes.favoriteTitle}>All Foods</h3>
      <PageList 
        filterBy='none'
        heightPerRow={20}
        isMaximized={true}
        minHeight={16}
      />
    </div>  
  )
}

export default OrderFood