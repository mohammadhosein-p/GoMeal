import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
  card: [{
    image: "/pizza.png",
    title: "pizza",
    count: 5,
    price: 5,
  }],
  foods: [],
  favorite: [],
  recentOrder: [],
  total: 25,
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addToCard(state, action) {
      const itemToAdd = action.payload;
      state.card = [...state.card, itemToAdd]
      state.total += itemToAdd.count * itemToAdd.price
    },
    increaseCount(state, action) {
      const { itemToIncrease, newCount } = action.payload
      const currentItem = state.card.filter(v => v.title == itemToIncrease)
      state.total += currentItem.price * (newCount - currentItem.count)
      currentItem.count = newCount
      state.card = [...state.card, currentItem]
    },
    removeFromCard(state, action) {
      const itemToRemove = action.payload;
      const item = state.card.find(v => v.title == itemToRemove)
      state.total -= item.count * item.price
      state.card = state.card.filter(v => v.title !== itemToRemove)
    },
    addToFavorite(state, action) {
      const itemToAdd = action.payload
      state.favorite = [...state.favorite, itemToAdd]
    },
    removeFromFavorite(state, action) {
      const itemToRemove = action.payload
      state.favorite = state.favorite.filter(v => v !== itemToRemove)
    },
    addAllFoods(state, action) {
      const foods = action.payload
      state.foods = foods
    },
    addRecentOrders(state, action) {
      const orders = action.payload
      state.recentOrder = [...state.recentOrder, orders]
    }
  }
})


const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
})

export const dataActions = dataSlice.actions
export default store