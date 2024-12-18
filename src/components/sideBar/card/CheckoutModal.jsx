import { useMutation } from "@tanstack/react-query";
import Modal from "../../modal/Modal";
import classes from "./Card.module.css";
import CardOverView from "./CardOverView";
import { useDispatch, useSelector } from "react-redux";
import { getUserCtx } from "../../../store/userContext";
import { useContext, useEffect, useState } from "react";
import { dataActions } from "../../../store/dataRedux";
import Notification from "../../notification/Notification";
import { sendHttp } from "../../../http/sendHttp";
import queryClient from "../../../query_client/queryClient";

function CheckoutModal({ isOpen, onClose, className, total }) {
  const card = useSelector((state) => state.data.card);
  const token = useSelector(state => state.data.token)
  const [message, setMessage] = useState({ isActive: false, title: "", text: "", type: "" });
  const userctx = useContext(getUserCtx());
  const userName = userctx.username
  const dispatch = useDispatch();
  const { mutate, isError, isLoading, error } = useMutation({
    mutationKey: ["checkout", "recent"],
    mutationFn: async () => {
      const currentDate = new Date()
      const foodToORder = card.map(elem => ({ [elem.title]: elem.count }))
      const foodToLog = card.map(elem => ({ title: elem.title, price: elem.price, image: elem.image, date: currentDate }))
      if (total > userctx.balance) throw new Error("you must increase your balance")
      const sendOrder = sendHttp("http://localhost:3000/checkout", { username: userName, order: foodToORder }, "POST", token)
      const updateLog = sendHttp("http://localhost:3000/recent", { name: userName, recentOrder: foodToLog }, "PUT", token)

      try {
        await Promise.all([sendOrder, updateLog])
      } catch (error) {
        console.log(error.message)
        throw error
      }
    },
    onError: (err) => {
      setMessage({ isActive: true, text: err.message, title: "Error", type: "error" })
      onClose()
    },
    onSuccess: () => {
      userctx.changeBalance(prevValue => prevValue - total)
      dispatch(dataActions.checkout());
      queryClient.invalidateQueries(['recent'])
      onClose();
      setMessage({
        isActive: true,
        text: "Checked out successfully",
        title: "Checkout",
        type: "success",
      });
    },
  });

  useEffect(() => {
    if (isOpen && card.length === 0 ) {
      setMessage({
        isActive: true,
        text: "Card is empty!",
        title: "Error",
        type: "error",
      });
      onClose();
    }
  }, [isOpen]);



  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className={className}>
        <div className={classes.modalContainer}>
          <h3>Your card:</h3>
          <CardOverView />
          <h3>
            total Price: <span className={classes.total}>{total}$</span>
          </h3>
          <div className={classes.checkoutModalButtonContainer}>
            {isLoading ? (
              <span>loading...</span>
            ) : (
              <button onClick={mutate} className={classes.checkout}>
                Check Out
              </button>
            )}
            <button onClick={onClose} className={classes.checkout}>
              Cancel
            </button>
          </div>
          {/* {isError && <p>{error.message}</p>} */}
        </div>
      </Modal>

      <Notification
        isOpen={message.isActive}
        onClose={() => setMessage({ isActive: false, text: "", title: "", type: "" })}
        text={message.text}
        title={message.title}
        type={message.type}
      />
    </>
  );
}

export default CheckoutModal;
