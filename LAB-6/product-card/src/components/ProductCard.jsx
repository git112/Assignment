import React, { useState } from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ name, price, description, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={name} 
          className={styles.image} 
        />
        <div className={`${styles.overlay} ${isHovered ? styles.showOverlay : ''}`}>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.namePrice}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>${price.toFixed(2)}</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;