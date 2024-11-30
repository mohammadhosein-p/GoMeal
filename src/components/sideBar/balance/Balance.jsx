import { useContext, useState } from "react"
import classes from "./Balance.module.css"
import { getUserCtx } from "../../../store/userContext"
import Modal from "../../modal/Modal"
import Notification from "../../notification/Notification"

function Balance() {
  const userCtx = useContext(getUserCtx())
  const [isTopupActive, setTopup] = useState(false)
  const [isTransferActive, setTransfer] = useState(false)
  const [message, setMessage] = useState({ isActive: false, title:"", text: "", type:"" })

  const changeBalance = (e, type) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const amount = parseFloat(data.get("text"))
  
    if (isNaN(amount) || amount <= 0) {
      console.error("Invalid input");
      return;
    }
  
    if (type === "topup") {
      const newBalance = userCtx.balance + amount;
      userCtx.changeBalance(newBalance);
      setTopup(false);
    } else if (type === "transfer") {
      const newBalance = userCtx.balance - amount;
      userCtx.changeBalance(newBalance);
      setTransfer(false);
    }
    setMessage({ isActive: true, title: "Success", type:"success", text:"balance updated successfully!" })
  };
  

  return (
    <>
      <h3 style={{ color: "#333" }}>Your Balance</h3>
      <div className={classes.balance}>
        <img src="/banner/balance.png" className={classes.balanceImage} />
        <div className={classes.balanceCurrent}>
          <span style={{ fontSize: "1rem", color: "#666" }}>Balance</span>
          <br />
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>${userCtx.balance.toFixed(2)}</span>
        </div>
        <div className={classes.topupSection} >
          <img className={classes.topupIcon} src="/balance/import.svg" onClick={() => setTopup(true)} />
          <p className={classes.topupText}>TopUp</p>
        </div>
        <div className={classes.transferSection}>
          <img src="/balance/export.svg" className={classes.topupIcon} onClick={() => setTransfer(true)} />
          <p className={classes.topupText}>Transfer</p>
        </div>
      </div>

      <Notification 
        isOpen={message.isActive}
        onClose={() => setMessage({isActive:false, text:"", title:"", type: ""})}
        text={message.text}
        title={message.title}
        type={message.type}
      />

      <Modal
        isOpen={isTopupActive}
        onClose={() => setTopup(false)}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <h3>Top Up</h3>
          <p>How much you want to deposit?</p>
          <form onSubmit={e => changeBalance(e, "topup")}>
            <input type="number" name="text" min={0} max={100} step={0.1} />
            <button>submit</button>
          </form>
          <h6 className={classes.error} style={{ display: "none" }}>error</h6>
        </div>
      </Modal>
      <Modal
        isOpen={isTransferActive}
        onClose={() => setTransfer(false)}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <h3>Transfer</h3>
          <p>How much you want to withdrawal?</p>
          <form onSubmit={e => changeBalance(e, "transfer")}>
            <input type="number" name="text" min={0} max={userCtx.balance.toFixed(1)} step={0.1} />
            <button>submit</button>
          </form>
          <h6 className={classes.error} style={{ display: "none" }}>error</h6>
        </div>
      </Modal>
    </>
  )
}

export default Balance