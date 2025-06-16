import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

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
useEffect(()=>{
    console.log(cartItems);
},[cartItems])

//provide any function and access in any function
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart
    }
    
    return (
        <StoreContext.Provider value = {contextValue} > {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
