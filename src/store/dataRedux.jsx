import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
  card: [],
  foods: [],
  category: [],
  recentOrder: [],
  total: 0,
  userName: "reza1",
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addAllFood(state, action) {
      state.foods = action.payload.data
    },

    changeUserName(state, action) {
      state.userName = action.payload.name
    },

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

    addAllRecent(state, action) {
      const rawOrders = action.payload;
      const finalRecentOrder = rawOrders.map(order => {
        const isFavorite = state.foods.some(food => food.title === order.title && food.isFavorite);
        return {
          ...order,
          isFavorite
        };
      });
    
      state.recentOrder = finalRecentOrder;
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