import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const BASE_URL = "https://healthy-snacks-website-backend.onrender.com";

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
        {popularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image} // ✅ Use image directly
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
