import React from 'react';
import ProductCard from '../components/ProductCard';
import styles from './Index.module.css';

// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    description: "Fitness tracker with heart rate monitoring, GPS and 7-day battery life.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Portable Speaker",
    price: 79.99,
    description: "Waterproof Bluetooth speaker with immersive sound and 12-hour playback.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=2076&auto=format&fit=crop"
  }
];

const Index = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Featured Products</h1>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;