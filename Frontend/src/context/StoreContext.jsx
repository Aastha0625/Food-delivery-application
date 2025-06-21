import axios from "axios";
import { createContext, useState, useEffect } from "react";


export const StoreContext = createContext(null)  //created and exported context

const StoreContextProvider = (props)=>{

const [cartItems, setCartItems] = useState({}); //for efficient counter
const url = "https://food-delivery-backend-h5ei.onrender.com"

//state variable
const [token,setToken] = useState("")

//get data from database
const [food_list,setFood_list] = useState([])

const fetchFoodList = async()=>{
    const response = await axios.get(url+"/api/food/list")
    setFood_list(response.data.data)
}
//add to cart 
const addToCart = async (itemId)=>{
    if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
}

//reload does not enable logout,store in local storage: update token state
useEffect(()=>{
    async function loadData() {
        await fetchFoodList()
    }
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
    }
    loadData()
},[])

//remove from cart
const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
}

//load cart data
const loadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
}

useEffect(()=>{
    async function loadData() {
        await fetchFoodList()
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
        }
    }
    loadData();
},[])


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

//provided any function and access in any function
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    
    return (
        <StoreContext.Provider value = {contextValue} > {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
