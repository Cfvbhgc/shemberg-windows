// Каталог продукции с фильтрацией

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

type FilterType = 'все' | 'поворотные' | 'раздвижные' | 'глухие' | 'откидные';

function Catalog() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('все');

  const filters: FilterType[] = ['все', 'поворотные', 'раздвижные', 'глухие', 'откидные'];

  const filteredProducts = activeFilter === 'все'
    ? products
    : products.filter(function(p) { return p.type === activeFilter; });

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Заголовок */}
        <motion.div
          className="catalog-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Каталог продукции</h1>
          <p>Оконные и дверные системы для любых архитектурных решений</p>
        </motion.div>

        {/* Фильтры */}
        <div className="catalog-filters">
          {filters.map(function(filter) {
            return (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Сетка продуктов */}
        <motion.div className="catalog-grid" layout>
          <AnimatePresence>
            {filteredProducts.map(function(product) {
              return <ProductCard key={product.id} product={product} />;
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default Catalog;
