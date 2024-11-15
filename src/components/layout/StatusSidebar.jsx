import classes from "./StatusSidebar.module.css"

function StatusSidebar() {
  return (
    <div className={classes.container}>

      <h3 style={{ color: "#333" }}>Your Balance</h3>
      <div className={classes.balance}>
        <img src="/banner/balance.png" className={classes.balanceImage} />
        <div className={classes.balanceCurrent}>
          <span style={{ fontSize: "1rem", color: "#666" }}>Balance</span>
          <br />
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>$12.000</span>
        </div>
        <div className={classes.topupSection} >
          <img className={classes.topupIcon} src="/balance/import.svg" />
          <p className={classes.topupText}>TopUp</p>
        </div>
        <div className={classes.transferSection}>
          <img src="/balance/export.svg" className={classes.topupIcon} />
          <p className={classes.topupText}>Transfer</p>
        </div>
      </div>

      <div className={classes.addressSection}>
        <h4>Your Address</h4>
        <div className={classes.addressRow}>
          <div>
            <img src="/location.svg" />
            <span>Elm street, 23</span>
          </div>
          <button>Change</button>
        </div>
        <p className="details">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, tempor incididunt.
        </p>
        <button className={classes.editButton}>Edit details</button>
      </div>

      <div className={classes.orderSection}>
        <h3>Order Menu</h3>
        <ul className={classes.cardUl}>
          <li className={classes.cardLi}>
            <img src="/pizza.png" />
            <div className={classes.cardLiDetail}>
              <h4>pepperoni pizza</h4>
              <p>x1</p>
            </div>
            <span className="price">+<span style={{color: "#F8B602"}}>$</span>5.5</span>
          </li>
        </ul>
      </div>

      <hr style={{ width: "80%", marginTop: "0.5rem" }} />
      <div className={classes.total}>
        <div className={classes.totalServicePrice}>
          <div><p>service</p></div>
          <div><p>+<span style={{color: "#F8B602"}}>$</span>1.00</p></div>
        </div>
        <div className={classes.totalOrderPrice}>
          <div><p>Total</p></div>
          <div><p>+<span style={{color: "#F8B602"}}>$</span>10.00</p></div>
        </div>
        <button className={classes.coupon}>
          <img src="/coupon.svg" />
          <span>Have a coupon code?</span>
          <img src="/arrow.svg" style={{ width: ".5rem" }} />
        </button>
        <button className={classes.checkout}>Checkout</button>
      </div>

    </div>
  )
}

export default StatusSidebar