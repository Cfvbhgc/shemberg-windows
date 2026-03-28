// Карточка продукта для каталога

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="product-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-badge">{product.type}</div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-material">{product.material}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">от {product.price.toLocaleString('ru-RU')} ₽</span>
          <button className="product-btn">Подробнее</button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
