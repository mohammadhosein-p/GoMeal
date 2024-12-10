import { useContext, useState } from "react"
import classes from "./Card.module.css"
import CardOverView from "./CardOverView"
import { getUserCtx } from "../../../store/userContext"
import { useSelector } from "react-redux"
import Modal from "../../modal/Modal"

function Card() {
  const [isEnterCouponEnabled, setEnterCouponEnable] = useState(false)
  const userCtx = useContext(getUserCtx())
  const total = useSelector(state => state.data.total)
  const calcedTotalPrice = userCtx.hasCoupon ? ((total * (100 - userCtx.couponPercentage) / 100) + userCtx.servicePrice).toFixed(2) : (total + userCtx.servicePrice).toFixed(2)

  const checkCoupon = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    if(data.get("text")) {
      userCtx.toggleHasCoupon(20)
    }
  }

  return (
    <>
      <div className={classes.orderSection}>
        <h3>Order Menu</h3>
        <CardOverView />
      </div>
      <hr style={{ width: "80%", marginTop: "0.5rem" }} />
      <div className={classes.total}>
        <div className={classes.totalServicePrice}>
          <div><p>service</p></div>
          <div><p>+<span style={{ color: "#F8B602" }}>$</span>{userCtx.servicePrice.toFixed(2)}</p></div>
        </div>
        {userCtx.hasCoupon && <div className={classes.totalServicePrice}>
          <div><p>coupon</p></div>
          <div><p>-<span style={{ color: "#F8B602" }}>$</span>{(total * userCtx.couponPercentage / 100).toFixed(2)}</p></div>
        </div>}
        <div className={classes.totalOrderPrice}>
          <div><p>Total</p></div>
          <div><p>+<span style={{ color: "#F8B602" }}>$</span>{calcedTotalPrice}</p></div>
        </div>
        {
          userCtx.hasCoupon ?
            <h5 className={classes.hasCoupon}>You have {userCtx.couponPercentage}% coupon!</h5> :
            <button className={classes.coupon} onClick={() => setEnterCouponEnable(true)}>
              <img src="/coupon.svg" />
              <span>Have a coupon code?</span>
              <img src="/arrow.svg" style={{ width: ".5rem" }} />
            </button>
        }
        <button className={classes.checkout}>Checkout</button>
      </div>

      <Modal
        isOpen={isEnterCouponEnabled}
        onClose={() => setEnterCouponEnable(false)}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <span>Enter your coupon</span>
          <form className={classes.modalForm} onSubmit={e => {checkCoupon(e); setEnterCouponEnable(false)}}>
            <input className={classes.modalInput} type="text" name="text" />
            <input className={classes.modalButton} type="submit" value="Submit" />
          </form>
          <span className={classes.modalError}>error</span>
        </div>
      </Modal>
    </>
  )
}

export default Card