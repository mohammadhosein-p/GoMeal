import classes from "./LoginPage.module.css"
import { useMutation } from "@tanstack/react-query"
import { sendHttp } from "../../http/sendHttp"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { dataActions } from "../../store/dataRedux"

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const redux = useSelector(state => state.data)
  
  const { mutate, isError, isLoading, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ username, password }) => {
      const result = await sendHttp("http://localhost:3000/login", { name: username, password: password }, "POST");
      return result;
    },
    onSuccess: (result, form) => {
      dispatch(dataActions.changeUserName({name: form.username}))
      dispatch(dataActions.changeToken({token : result.token}))
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
        <h2>Login</h2>
        <p>Welcome back! Please enter your credentials to access your account.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" maxLength={40} name="username" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          
          {isLoading ? <p>Loading...</p> : <button type="submit">Login</button>}
          <Link to="/signup">Don't have an account? Signup here</Link>
        </form>
        {isError && <span style={{display: isError ? "inline" : "none"}}>{error.message}</span>}
      </div>
    </div>
  );
}

export default LoginPage;