// Галерея проектов — masonry grid + lightbox + before/after

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems, beforeAfterItems } from '../data/gallery';
import BeforeAfter from '../components/BeforeAfter';

function Gallery() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  function openLightbox(image: string) {
    setLightboxImage(image);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightboxImage(null);
    document.body.style.overflow = '';
  }

  return (
    <div className="gallery-page">
      <div className="container">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Галерея проектов</h1>
          <p>Реализованные объекты — от частных домов до бизнес-центров</p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {galleryItems.map(function(item, index) {
            return (
              <motion.div
                key={item.id}
                className={`masonry-item ${index % 3 === 0 ? 'tall' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openLightbox(item.image)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="masonry-overlay">
                  <h3>{item.title}</h3>
                  <span>{item.category}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Before/After секция */}
        <motion.div
          className="before-after-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">До и После</h2>
          <p className="section-subtitle">Перетащите ползунок, чтобы сравнить результат</p>
          <div className="before-after-grid">
            {beforeAfterItems.map(function(item) {
              return (
                <BeforeAfter
                  key={item.id}
                  before={item.before}
                  after={item.after}
                  title={item.title}
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.img
              src={lightboxImage}
              alt="Просмотр"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
