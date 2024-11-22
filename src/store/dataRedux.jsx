import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
  card: [{
    image: "/pizza.png",
    title: "pizza",
    count: 5,
    price: 5,
  }],
  foods: [
    {
      isFavorite: true,
      image: '/card/hamber.png',
      stars: 5,
      title: "Hamber1",
      price: 5,
      isPopular: true,
      offerPercentage: 15,
      category: "burger",
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      stars: 3,
      title: "Hamber2",
      price: 10,
      isPopular: true,
      offerPercentage: 20,
      category: "burger",
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
    {
      isFavorite: false,
      image: '/card/hamber.png',
      stars: 4,
      title: "Hamber3",
      price: 15,
      isPopular: true,
      offerPercentage: 0,
      category: "burger",
    },
  ],
  category: [
    { image: '/category/pizza.svg', title: 'Pizza' },
    { image: '/category/burger.svg', title: 'Burger' },
    { image: '/category/coffee.svg', title: 'Coffee' },
    { image: '/category/fish.svg', title: 'Fish' },
    { image: '/category/chicken.svg', title: 'Chicken' },
    { image: '/category/bakery.svg', title: 'Bakery' },
  ],
  recentOrder: [
    {
      isFavorite: true,
      image: '/card/hamber.png',
      title: "Hamber1",
      price: 5,
      date: new Date(2024, 10, 22, 18, 24)
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      title: "Hamber1",
      price: 5,
      date: new Date(2024, 10, 22, 18, 24)
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      title: "Hamber1",
      price: 5,
      date: new Date(2024, 10, 22, 18, 24)
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      title: "Hamber1",
      price: 5,
      date: new Date(2024, 10, 22, 18, 24)
    },
    {
      isFavorite: true,
      image: '/card/hamber.png',
      title: "Hamber1",
      price: 5,
      date: new Date(2024, 10, 22, 18, 24)
    },
  ],
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

    addFoodAndFavrite(state, action) {
      const { foods, favorite } = action.payload;
      const updatedFoods = foods.map((food) => ({
        ...food,
        isFavorite: favorite.includes(food.title),
      }));
      state.foods = updatedFoods;
    },
    
    toggleFavorite(state, action) {
      const food = state.foods.find((food) => food.title === action.payload);
      if (food) {
        food.isFavorite = !food.isFavorite;
      }
    },
    
    addRecentOrders(state, action) {
      const orders = action.payload
      state.recentOrder = [...state.recentOrder, orders]
    },
    
    addAllCategories(state, action) {
      state.category = action.payload
    },
  }
})


const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
})

export const dataActions = dataSlice.actions
export default store