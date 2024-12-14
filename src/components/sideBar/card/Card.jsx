import { useContext, useState } from "react"
import classes from "./Card.module.css"
import CardOverView from "./CardOverView"
import { getUserCtx } from "../../../store/userContext"
import { useSelector } from "react-redux"
import Modal from "../../modal/Modal"
import { useMutation } from "@tanstack/react-query"
import { sendHttp } from "../../../http/sendHttp"
import CheckoutModal from "./CheckoutModal"
import Notification from "../../notification/Notification"

function Card() {
  const [isEnterCouponEnabled, setEnterCouponEnable] = useState(false)
  const [isRemoveCouponEnabled, setRemoveCouponEnable] = useState(false)
  const [isCheckoutActive, setCheckoutActive] = useState(false)
  const [message, setMessage] = useState({ isActive: false, title: "", text: "", type: "" })
  const userCtx = useContext(getUserCtx())
  const total = useSelector(state => state.data.total)
  let calcedTotalPrice = total.toFixed(2)
  calcedTotalPrice -= userCtx.hasCoupon ? (total * (userCtx.couponPercentage / 100)).toFixed(2) : 0;
  calcedTotalPrice -= userCtx.isPremium ? (total * 0.05).toFixed(2) : 0;

  const { mutate, isError, isLoading, error } = useMutation({
    mutationKey: ["coupon"],
    mutationFn: (data) => {
      const result = sendHttp("http://localhost:3000/coupon", `coupon=${data.coupon}`)
      return result
    },
    onSuccess: (result) => {
      userCtx.toggleHasCoupon(result.percentage)
      setMessage({ isActive: true, title: "Success", type: "success", text: "coupon successfully applied!" })
      setEnterCouponEnable(false)
    },
    onError: (err) => console.log(err),
  })

  const checkCoupon = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    mutate({ coupon: data.get("text") })
  }
  const removeCoupon = () => {
    setRemoveCouponEnable(false); 
    userCtx.toggleHasCoupon()
    setMessage({ isActive: true, title: "Success", type:"success", text:"coupon successfully removed"})
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
        {
          userCtx.hasCoupon && <div className={classes.totalServicePrice}>
            <div><p>coupon</p></div>
            <div><p>-<span style={{ color: "#F8B602" }}>$</span>{(total * userCtx.couponPercentage / 100).toFixed(2)}</p></div>
          </div>
        }
        {
          userCtx.isPremium && total > 0 && <div className={classes.totalServicePrice}>
            <div><p>Premium</p></div>
            <div><p>-<span style={{ color: "#F8B602" }}>$</span>{(total * .05).toFixed(2)}</p></div>
          </div>
        }

        <div className={classes.totalOrderPrice}>
          <div><p>Total</p></div>
          <div><p>+<span style={{ color: "#F8B602" }}>$</span>{(calcedTotalPrice + userCtx.servicePrice).toFixed(2)}</p></div>
        </div>

        {
          userCtx.hasCoupon ?
            <h5 className={classes.hasCoupon} onClick={() => setRemoveCouponEnable(true)}>You have {userCtx.couponPercentage}% coupon!</h5> :
            <button className={classes.coupon} onClick={() => setEnterCouponEnable(true)}>
              <img src="/coupon.svg" />
              <span>Have a coupon code?</span>
              <img src="/arrow.svg" style={{ width: ".5rem" }} />
            </button>
        }
        <button className={classes.checkout} onClick={() => setCheckoutActive(true)}>Checkout</button>
      </div>

      <Modal
        isOpen={isEnterCouponEnabled}
        onClose={() => setEnterCouponEnable(false)}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <span>Enter your coupon</span>
          <form className={classes.modalForm} onSubmit={e => { checkCoupon(e) }}>
            <input className={classes.modalInput} type="text" name="text" />
            {isLoading ? <p>fetching...</p> : <button className={classes.modalButton}>Submit</button>}
          </form>
          {isError && <span className={classes.modalError}>{error.error}</span>}
        </div>
      </Modal>
      <Modal
        isOpen={isRemoveCouponEnabled}
        onClose={() => setRemoveCouponEnable(false)}
      >
        <div className={classes.modalContainer}>
          <h3>Are you sure you want to remove your coupon?</h3>
          <div className={classes.modalButtonContainer}>
            <button onClick={removeCoupon}>Remove</button>
            <button onClick={() => setRemoveCouponEnable(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
      <CheckoutModal
        isOpen={isCheckoutActive}
        onClose={() => setCheckoutActive(false)}
        className={classes.checkoutModal}
        total={(calcedTotalPrice + userCtx.servicePrice).toFixed(2)}

      />

      <Notification
        isOpen={message.isActive}
        onClose={() => setMessage({ isActive: false, text: "", title: "", type: "" })}
        text={message.text}
        title={message.title}
        type={message.type}
      />

    </>
  )
}

export default Card