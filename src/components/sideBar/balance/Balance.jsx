import { useContext, useState } from "react"
import classes from "./Balance.module.css"
import { getUserCtx } from "../../../store/userContext"
import Modal from "../../modal/Modal"
import Notification from "../../notification/Notification"
import { useMutation } from "@tanstack/react-query"
import { sendHttp } from "../../../http/sendHttp"
import { useSelector } from "react-redux"

function Balance() {
  const token = useSelector(state => state.data.token)
  const userCtx = useContext(getUserCtx())
  const [isTopupActive, setTopup] = useState(false)
  const [isTransferActive, setTransfer] = useState(false)
  const [message, setMessage] = useState({ isActive: false, title:"", text: "", type:"" })
  let {mutate, isError, error, isLoading} = useMutation({
    mutationKey: ["balance"],
    mutationFn: (data) => {
      if(data.balance >= 1000) {
        throw new Error("maximum balance is 1000")
      }

      if(data.balance < 0) {
        const userBalance = userCtx.balance
        throw new Error(`value must be less than ${userBalance}`)
      }
      const result = sendHttp("http://localhost:3000/balance", {
        name: userCtx.username,
        balance: data.balance
      }, "PUT", token)
      return result
    },
    onSuccess: (result, data) => {
      if(result?.acknowledged) {
        userCtx.changeBalance(data.balance)
        setTopup(false)
        setTransfer(false)
        setMessage({ isActive: true, title: "Success", type:"success", text:"balance updated successfully!" })
      }
    },
    onError: (err) => {
      console.log(err)
    }

  })

  const changeBalance = (e, type) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const amount = parseFloat(data.get("text"))
  
    if (isNaN(amount) || amount <= 0) {
      return;
    }
    
    let newBalance = 0;
    if (type === "topup") {
      newBalance = userCtx.balance + amount;
    } else if (type === "transfer") {
      newBalance = userCtx.balance - amount;
    }

    if(newBalance) mutate({ balance: newBalance })
  };
  

  return (
    <>
      <h3 style={{ color: "#333" }}>Your Balance</h3>
      <div className={classes.balance}>
        <img src="/banner/balance.png" className={classes.balanceImage} />
        <div className={classes.balanceCurrent}>
          <span style={{ fontSize: "1rem", color: "#666" }}>Balance</span>
          <br />
          <span style={{ fontSize: "1.3rem", fontWeight: 700 }}>${userCtx.balance?.toFixed(2)}</span>
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
        onClose={() => { setTopup(false); error="" }}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <h3>Top Up</h3>
          <p>How much you want to deposit?</p>
          <form onSubmit={e => changeBalance(e, "topup")}>
            <input type="number" name="text" min={0} step={0.1} />
            {isLoading ? <p>fetching...</p> : <button>submit</button>}
          </form>
          {isError && <h6 className={classes.error}>{error.message}</h6>}
        </div>
      </Modal>
      <Modal
        isOpen={isTransferActive}
        onClose={() => {setTransfer(false); error = ""}}
        className={classes.modal}
      >
        <div className={classes.modalContainer}>
          <h3>Transfer</h3>
          <p>How much you want to withdrawal?</p>
          <form onSubmit={e => changeBalance(e, "transfer")}>
            <input type="number" name="text" min={0} step={0.1} />
            {isLoading ? <p>fetching...</p> : <button>submit</button>}
          </form>
            {isError && <h6 className={classes.error}>{error.message}</h6>}
          </div>
      </Modal>
    </>
  )
}

export default Balance