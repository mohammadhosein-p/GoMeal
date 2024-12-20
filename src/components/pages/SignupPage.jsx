import classes from "./LoginPage.module.css"
import { useMutation } from "@tanstack/react-query"
import { sendHttp } from "../../http/sendHttp"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { dataActions } from "../../store/dataRedux"

function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const redux = useSelector(state => state.data)

  const { mutate, isError, isLoading, error } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async ({ username, password }) => {
      
      const info = {
        name: username,
        balance: 0,
        isPremium: false,
        address: "change your address...",
        password,
        addressDetail: "change your address detail",
        favorite: [],
        recentOrder: []
      }

      const result = await sendHttp("http://localhost:3000/signup", { name: username, password: password, info }, "POST");
      return result;
    },
    onSuccess: (result, form) => {
      console.log(result.token)
      console.log(form.username)
      dispatch(dataActions.changeUserName({ name: form.username }))
      dispatch(dataActions.changeToken({token: result.token}))
      console.log(redux)
      navigate("/")
    },
    onError: err => console.log(err)
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    mutate({ username, password });
  };

  return (
    <div className={classes.backGround}>
      <div className={classes.mainContainer}>
        <h2>Sign Up</h2>
        <p>Create a new account to start ordering your favorite meals.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" maxLength={30} id="username" name="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" minLength={8} maxLength={50} name="password" required />

          {isLoading ? <p>Loading...</p> : <button type="submit">Sign Up</button>}
          <Link to="/login">Already have an account? Login here</Link>
        </form>
        {isError && <span style={{ display: isError ? "inline" : "none" }}>{error.message}</span>}
      </div>
    </div>
  );
}

export default SignupPage;