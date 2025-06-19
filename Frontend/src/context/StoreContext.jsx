import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets.js";

export const StoreContext = createContext(null)  //created and exported context

const StoreContextProvider = (props)=>{

const [cartItems, setCartItems] = useState({}); //for efficient counter

//add to cart 
const addToCart = (itemId)=>{
    if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
}

//remove from cart
const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
}
// useEffect(()=>{
//     console.log(cartItems);
// },[cartItems])

//get cart total
const getTotalCartAmount = ()=>{
    let totalAmount = 0
    for (const item in cartItems) {
        if (cartItems[item]>0) {
            let itemInfo = food_list.find((product)=> product._id === item)
            totalAmount += itemInfo.price * cartItems[item]
        }
    }
    return totalAmount;
}

//provide any function and access in any function
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount
    }
    
    return (
        <StoreContext.Provider value = {contextValue} > {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
