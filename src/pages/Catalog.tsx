import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { products, windowTypes, Product } from '../data/products';

const Catalog: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.type === filter);

  return (
    <div className="catalog-page">
      <motion.div
        className="catalog-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Product Catalog</h1>
        <p>Explore our full range of window and door systems</p>
      </motion.div>

      <div className="filter-bar">
        {windowTypes.map(type => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {type === 'all' ? 'All Products' : type}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div className="product-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map(product => (
              <motion.div
                key={product.id}
                className="product-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedProduct(product)}
              >
                <div style={{ overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} className="product-card-image" />
                </div>
                <div className="product-card-body">
                  <h3>{product.name}</h3>
                  <div className="product-card-meta">{product.type} &middot; {product.material}</div>
                  <div className="product-card-price">{product.price}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
              <div className="modal-body">
                <h2>{selectedProduct.name}</h2>
                <div className="modal-meta">{selectedProduct.type} &middot; {selectedProduct.material}</div>
                <div className="modal-price">{selectedProduct.price}</div>
                <p>{selectedProduct.description}</p>
                <ul className="modal-features">
                  {selectedProduct.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
