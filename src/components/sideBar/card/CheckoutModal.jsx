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

function CheckoutModal({ isOpen, onClose, className, total }) {
  const card = useSelector((state) => state.data.card);
  const [message, setMessage] = useState({ isActive: false, title: "", text: "", type: "" });
  const userName = useContext(getUserCtx()).username;
  const dispatch = useDispatch();
  const { mutate, isError, isLoading, error } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: () => {
      const order = card.map(elem => ( {[elem.title]: elem.count} ))
      sendHttp("http://localhost:3000/checkout", { username: userName, order }, "POST")
    },
    onError: (err) => console.log(err.message),
    onSuccess: () => {
      dispatch(dataActions.checkout());
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
    if (isOpen && (!card || card.length === 0)) {
      setMessage({ isActive: true, text: "Your card is empty", title: "Error", type: "error" });
      setTimeout( onClose(), 0);
    }
  }, [isOpen, card, onClose]);

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
          {isError && <p>{error.message}</p>}
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
