import { useContext, useState } from "react"
import classes from "./ContactPage.module.css"
import { getUserCtx } from "../../store/userContext"
import { useMutation } from "@tanstack/react-query"
import { sendHttp } from "../../http/sendHttp"
import Notification from "../notification/Notification"

function ContactPage() {
  const [keyIndex, setKeyIndex] = useState(0)
  const [message, setMessage] = useState({ isActive: false, title: "", text: "", type: "" })
  const userCtx = useContext(getUserCtx())
  const { mutate } = useMutation({
    mutationKey: ["contact"],
    mutationFn: async (event) => {
      event.preventDefault()
      const message = new FormData(event.target)
      const result = await sendHttp("http://localhost:3000/message", { name: message.get("name"), subject: message.get("subject"), text: message.get("text") }, "PUT")
      return result
    },
    onSuccess: (result) => {
      setMessage({isActive:true, text:result.message, title:"Success", type:"success"})
      setKeyIndex(PrevValue => PrevValue + 1)
    },
    onError: err => setMessage({isActive:true, text:err.message, title:"Error", type:"error"})
  })

  return <>
    <div className={classes.mainContainer} key={keyIndex}>
      <h2>Contact Us</h2>
      <p>We are here to help! Whether you have a
        question, need assistance with your orders, or want to share your feedback, feel free to reach out to us.</p>

      <div className="container">
        <form className={classes.form} onSubmit={mutate}>
          <label htmlFor="name">name</label>
          <input type="text" name="name" defaultValue={userCtx.username} maxLength={20} />

          <label htmlFor="subject">subject</label>
          <input type="text" name="subject" maxLength={110} />

          <label htmlFor="text">your message</label>
          <textarea name="text" maxLength={1000} />

          <button>Submit</button>

        </form>
      </div>
    </div>

    <Notification
      isOpen={message.isActive}
      onClose={() => setMessage({ isActive: false, text: "", title: "", type: "" })}
      text={message.text}
      title={message.title}
      type={message.type}
    />

  </>

}

export default ContactPage