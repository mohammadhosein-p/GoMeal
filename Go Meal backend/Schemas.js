import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  isPremium: Boolean,
  address: String,
  password: String,
  addressDetail: String,
  favorite: [String],
  recentOrder: [
    {
      date: String,
      image: String,
      price: Number,
      title: String,
    }
  ],
});

export const User = mongoose.model("user", userSchema)

const foodSchema = new mongoose.Schema({
  category: String,
  price: Number,
  stars: Number,
  imageAddress: String,
  title: String,
  isPopular: Boolean,
  offerPercentage: Number,
})

export const Food = mongoose.model("food", foodSchema)