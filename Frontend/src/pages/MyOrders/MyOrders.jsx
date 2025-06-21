import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets.js'; 


const MyOrders = () => {

    const {url,token} = useContext(StoreContext)
    const [data,setData] = useState([]);

const fetchOrders = async () => {
  try {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    if (response.data.success) {
      setData(response.data.data);
    } else {
      alert("Could not fetch orders");
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    alert("Something went wrong while fetching orders");
  }
};

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
  <h2>My Orders</h2>
  <div className="container">
    {data.length > 0 && (
      <div className="my-orders-order">
        <img src={assets.parcel_icon} alt="" />
        
        {/* Items List */}
        <p>
          {data.flatMap(order => order.items)
               .map(item => `${item.name} x ${item.quantity}`)
               .join(', ')}
        </p>

        {/* Total Amount */}
        <p>₹{data.reduce((total, order) => total + order.amount, 0).toFixed(2)}</p>

        {/* Total Item Count */}
        <p>Items: {data.reduce((total, order) => total + order.items.length, 0)}</p>

        {/* Order Status — we show status of the latest order */}
        <p>
          <span>&#x25cf;</span> <b>{data[data.length - 1].status}</b>
        </p>
        <button onClick={fetchOrders}>Track order</button>
      </div>
    )}
  </div>
</div>

  )
}

export default MyOrders;