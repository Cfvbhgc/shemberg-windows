import React from 'react';
import { motion } from 'framer-motion';
import ComparisonSlider from '../components/ComparisonSlider';

const comparisons = [
  {
    title: 'Villa Renovation — Lake Zurich',
    before: '/images/gallery-before-1.jpg',
    after: '/images/gallery-after-1.jpg',
  },
  {
    title: 'Commercial Facade — Berlin',
    before: '/images/gallery-before-2.jpg',
    after: '/images/gallery-after-2.jpg',
  },
  {
    title: 'Heritage Conversion — Vienna',
    before: '/images/gallery-before-3.jpg',
    after: '/images/gallery-after-3.jpg',
  },
];

const Gallery: React.FC = () => {
  return (
    <div className="gallery-page">
      <motion.div
        className="gallery-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Project Gallery</h1>
        <p>Before and after transformations with Shemberg systems</p>
      </motion.div>

      <div className="gallery-items">
        {comparisons.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <ComparisonSlider
              title={c.title}
              beforeImage={c.before}
              afterImage={c.after}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
