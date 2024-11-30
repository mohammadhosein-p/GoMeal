import { useContext, useState } from "react"
import classes from "./Address.module.css"
import { getUserCtx } from "../../../store/userContext"
import Modal from "../../modal/Modal"
import Notification from "../../notification/Notification"

function Address() {
  const userCtx = useContext(getUserCtx())
  const [isEditDetailActive, setEditModal] = useState(false)
  const [isEditAddressActive, setEditAddress] = useState(false)
  const [message, setMessage] = useState({ isActive: false, title: "", text: "", type: "" })

  const changeAddress = (e, type) => {
    e.preventDefault()
    const data = new FormData(e.target)
    if (type == "address") {
      userCtx.changeAddress(data.get("text"))
      setEditAddress(false)
    } else {
      setEditModal(false)
      userCtx.changeAddressDetail(data.get("text"))
    }
    setMessage({ isActive: true, title: "Success", type: "success", text: "address updated successfully!" })
  }


  return (
    <div className={classes.addressSection}>
      <h4>Your Address</h4>
      <div className={classes.addressRow}>
        <div>
          <img src="/location.svg" />
          <span>{userCtx.address}</span>
        </div>
        <button onClick={() => setEditAddress(true)}>Change</button>
      </div>
      <p className="details">{userCtx.addressDetail}</p>
      <button className={classes.editButton} onClick={() => setEditModal(true)}>Edit details</button>

      <Notification
        isOpen={message.isActive}
        onClose={() => setMessage({ isActive: false, text: "", title: "", type: "" })}
        text={message.text}
        title={message.title}
        type={message.type}
      />

      <Modal
        isOpen={isEditDetailActive}
        onClose={() => setEditModal(false)}
        className={classes.editAddressModal}
      >
        <div className={classes.modalContainer}>
          <h3>you can edit your address detail here</h3>
          <form onSubmit={(e) => changeAddress(e, "address-detail")}>
            <input type="text" name="text" defaultValue={userCtx.addressDetail} maxLength={100} />
            <button>submit</button>
          </form>
          <h6 className={classes.error} style={{ display: "none" }}>error</h6>
        </div>
      </Modal>
      <Modal
        isOpen={isEditAddressActive}
        onClose={() => setEditAddress(false)}
        className={classes.editAddressModal}
      >
        <div className={classes.modalContainer}>
          <h3>You can edit your address here</h3>
          <form onSubmit={(e) => changeAddress(e, "address")}>
            <input type="text" name="text" defaultValue={userCtx.address} maxLength={18} />
            <button>submit</button>
          </form>
          <h6 className={classes.error} style={{ display: "none" }}>error</h6>
        </div>
      </Modal>

    </div>
  )
}

export default Address