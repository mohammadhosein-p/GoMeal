import classes from "./HomePage.module.css"

function HomePage() {
  return (
    <div className={classes.container}>
      <div className={classes.greeting}>
        <span>Hello, Mamad</span>
        <div className={classes.search}>
          <a href="#"><img src="/search.svg" /></a>
          <input type="text" placeholder="What do you want eat today..." />
        </div>
      </div>

      <div className={classes.offerContainer}>
        <img src="/mainpage/offer/background.png" className={classes.offerBanner} />
        <div className={classes.offerBannerDetails}>
          <div className={classes.bannerText}>
            <h3>Get Discount Voucher Up To 20%</h3>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h5>
          </div>
          <img src="/mainpage/offer/person.png" className="banner person" />
        </div>
      </div>

      <div className="category">
        <div className={classes.categoryText}>
          <h3>Category</h3>
          <a href="/">
            <span>View all</span>
            <img src="/yellow_arrow.svg" />
          </a>
        </div>
        <ul className={`${classes.categoriesContainer} ${classes.categoriesContainerMaxed}`}>
          <li className="category card">
            <img src="/category/pizza.svg" />
            <span>Pizza</span>
          </li>
          <li className="category card">
            <img src="/category/pizza.svg" />
            <span>Pizza</span>
          </li>
          <li className="category card">
            <img src="/category/pizza.svg" />
            <span>Pizza</span>
          </li>
          <li className="category card">
            <img src="/category/pizza.svg" />
            <span>Pizza</span>
          </li>
          <li className="category card">
            <img src="/category/pizza.svg" />
            <span>Pizza</span>
          </li>
        </ul>
      </div>

      <div className="popular dishes preview">
        <div className={classes.categoryText}>
          <h3>Popular Dishes</h3>
          <a href="/">
            <span>View all</span>
            <img src="/yellow_arrow.svg" />
          </a>
        </div>
        <ul className={classes.card}>
          <li className="card">
            <a href="#"><img src="/card/red_heart.svg" className={classes.favoriteIcon} /></a>
            <img src="/card/hamber.png" className={classes.foodImage} />
            <div className="stars">
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
            </div>
            <div className={classes.cardDetails}>
              <div className="details text">
                <span>Hamber</span>
                <br />
                <span><span style={{ color: "#F8B602" }}>$</span>5.00</span>
              </div>
              <a href="/" className={classes.cardAddIcon}>+</a>
            </div>
          </li>
          <li className="card">
            <a href="#"><img src="/card/red_heart.svg" className={classes.favoriteIcon} /></a>
            <img src="/card/hamber.png" className={classes.foodImage} />
            <div className="stars">
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
            </div>
            <div className={classes.cardDetails}>
              <div className="details text">
                <span>Hamber</span>
                <br />
                <span><span style={{ color: "#F8B602" }}>$</span>5.00</span>
              </div>
              <a href="/" className={classes.cardAddIcon}>+</a>
            </div>
          </li>
          <li className="card">
            <a href="#"><img src="/card/red_heart.svg" className={classes.favoriteIcon} /></a>
            <img src="/card/hamber.png" className={classes.foodImage} />
            <span className={classes.cardOffer}>15% Off</span>
            <div className="stars">
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
              <img src="/card/star.svg" />
            </div>
            <div className={classes.cardDetails}>
              <div className="details text">
                <span>Hamber</span>
                <br />
                <span><span style={{ color: "#F8B602" }}>$</span>5.00</span>
              </div>
              <a href="/" className={classes.cardAddIcon}>+</a>
            </div>
          </li>
        </ul>
      </div>

      <div className="recent order">
        <div className={classes.categoryText}>
          <h3>Recent Order</h3>
          <a href="/">
            <span>View all</span>
            <img src="/yellow_arrow.svg" />
          </a>
        </div>
      </div>

      <ul className={classes.recentCard}>
      <li>
          <a href="#"><img src="/card/red_heart.svg" className={classes.favoriteIcon} /></a>
          <img src="/card/hamber.png" className={classes.recentFoodImage} />
          <h3>Hamber</h3>
          <h4><span style={{color: "#F8B602"}}>$</span>5.50</h4>
          <h5>21 min</h5>
        </li>
        <li>
          <a href="#"><img src="/card/red_heart.svg" className={classes.favoriteIcon} /></a>
          <img src="/card/hamber.png" className={classes.recentFoodImage} />
          <h3>Hamber</h3>
          <h4><span style={{color: "#F8B602"}}>$</span>5.50</h4>
          <h5>21 min</h5>
        </li>
        <li>
          <a href="#"><img src="/card/red_heart.svg" className={classes.favoriteIcon} /></a>
          <img src="/card/hamber.png" className={classes.recentFoodImage} />
          <h3>Hamber</h3>
          <h4><span style={{color: "#F8B602"}}>$</span>5.50</h4>
          <h5>21 min</h5>
        </li>
      </ul>

    </div>
  )
}

export default HomePage