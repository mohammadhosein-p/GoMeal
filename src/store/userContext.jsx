/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, createContext } from "react";

const UserContext = createContext({
  username: '',
  isLogged: false,
  balance: 0,
  address: "choose an address",
  addressDetail: "add detail to your address with edit detail...",
  isPremium: false,
  hasCoupon: false,
  couponPercentage: 0,
  servicePrice: 1,
  changeUsername: () => {},
  toggleIsLogged: () => {},
  changeBalance: () => {},
  changeAddress: () => {},
  changeAddressDetail: () => {},
  toggleIsPremium: () => {},
  toggleHasCoupon: () => {},
  changeServicePrice: () => {},
});

export default function UserContextProvider({ children }) {
  const [username, changeUsername] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [balance, changeBalance] = useState(0);
  const [address, changeAddress] = useState("add your address");
  const [addressDetail, changeAddressDetail] = useState("add detail to your address with edit detail...");
  const [isPremium, setIsPremium] = useState(false);
  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponPercentage, setCouponPercentage] = useState(0);
  const [servicePrice, changeServicePrice] = useState(1);

  const toggleIsLogged = () => setIsLogged((prev) => !prev);
  const toggleIsPremium = () => setIsPremium((prev) => !prev);
  const toggleHasCoupon = (newPercentage = 0) => {
    setHasCoupon((prev) => !prev);
    setCouponPercentage(!hasCoupon ? newPercentage : 0);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        isLogged,
        balance,
        address,
        addressDetail,
        isPremium,
        hasCoupon,
        couponPercentage,
        servicePrice,
        changeUsername,
        toggleIsLogged,
        changeBalance,
        changeAddress,
        changeAddressDetail,
        toggleIsPremium,
        toggleHasCoupon,
        changeServicePrice
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const getUserCtx = () => {
  return UserContext
}