// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MyOrders.css';

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/orders'); // Adjust this URL
//         setOrders(response.data);
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//         setError('Error fetching orders');
//       }
//     };
  
//     fetchOrders();
//   }, []);
  
  
  

//   if (loading) {
//     return <div className="loading">Loading your orders...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//   <div className="my-orders">
//     {loading ? (
//       <p>Loading...</p>
//     ) : error ? (
//       <p className="error-message">{error}</p>
//     ) : orders.length === 0 ? (
//       <p>No orders found.</p>
//     ) : (
//       <div>
//         <h2>My Orders</h2>
//         <ul>
//           {orders.map(order => (
//             <li key={order.orderId}>
//               <p>Order ID: {order.orderId}</p>
//               <p>Amount: ₹{order.amount}</p>
//               <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//               <ul>
//                 {order.products.map((product, idx) => (
//                   <li key={idx}>
//                     <p>{product.name} - {product.quantity} x ₹{product.price}</p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </div>
// );

// };

// export default MyOrders;
