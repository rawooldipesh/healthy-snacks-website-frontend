import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/popular`)
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, [BASE_URL]);

  return (
    <div className='popular'>
      <h1>OUR SPECIALS</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={`${BASE_URL}/uploads/${item.image}`} // if image is stored as filename
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
