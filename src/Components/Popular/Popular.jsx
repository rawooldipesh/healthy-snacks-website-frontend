import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'

const Popular = () => {

  const [popularProducts,setPopularProducts] = useState([]);
    useEffect(()=>{
      fetch('http://localhost:4000/popular')
      .then((response)=>response.json())
      .then((data)=>setPopularProducts(data));
    })

  return (
    <div className='popular'>
        <h1>OUR SPECIALS</h1>
        <hr/>
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
            })}
        </div>
    </div>
  )
}

export default Popular