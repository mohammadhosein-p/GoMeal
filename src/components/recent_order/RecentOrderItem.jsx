/* eslint-disable react/prop-types */
import classes from "./RecentOrder.module.css";

function RecentOrderItem({ image, isFavorite, title, price, date }) {
  
  const now = new Date().getTime(); 
  const orderDate = new Date(date).getTime(); 
  const diffInMs = now - orderDate; 

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60); 
  const diffInDays = Math.floor(diffInHours / 24); 
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  let timeAgo;
  if (diffInYears > 0) {
    timeAgo = `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } else if (diffInMonths > 0) {
    timeAgo = `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 0) {
    timeAgo = `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    timeAgo = `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    timeAgo = `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    timeAgo = "a few moments ago"
  }

  return (
    <li>
      <a href="#">
        <img
          src={isFavorite ? "/card/red_heart.svg" : "/card/gray_heart.svg"}
          className={classes.favoriteIcon}
        />
      </a>
      <img src={image} className={classes.recentFoodImage} />
      <h3>{title}</h3>
      <h4>
        <span style={{ color: "#F8B602" }}>$</span>
        {price.toFixed(2)}
      </h4>
      <h5>{timeAgo}</h5>
    </li>
  );
}

export default RecentOrderItem;
