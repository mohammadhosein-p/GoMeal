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
      title: "pizza",
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
      const existingItem = state.card.find((elem) => elem.title === itemToAdd);
      if (existingItem) {
        if (existingItem.count > 14) {
          return
        }
        existingItem.count += 1;
      } else {
        const item = state.foods.find((elem) => elem.title === itemToAdd);
        if (item) {
          state.card.push({
            title: item.title,
            price: item.price,
            image: item.image,
            count: 1,
          });
        }
      }
      const addedItem = state.foods.find((elem) => elem.title === itemToAdd);
      if (addedItem) {
        state.total += addedItem.price;
      }
    },
    
    removeFromCard(state, action) {
      const itemToRemove = action.payload;
      const existingItem = state.card.find((elem) => elem.title === itemToRemove);
      state.total -= existingItem.price;
    
      if (existingItem && existingItem.count > 1) {
        existingItem.count -= 1;
      } else {
        state.card = state.card.filter( elem => elem.title !== itemToRemove)
      }
    },
    
    toggleFavorite(state, action) {
      state.foods = state.foods.map((food) =>
        food.title === action.payload
          ? { ...food, isFavorite: !food.isFavorite }
          : food
      );
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