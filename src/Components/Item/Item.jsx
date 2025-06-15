import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-price">
            ₹{props.price}/250 gms
        </div>
    </div>
  )
}

export default Item