import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import WindowPreview from '../components/WindowPreview';

const frameOptions = [
  { value: 'aluminum', label: 'Aluminum', priceMultiplier: 1.0 },
  { value: 'pvc', label: 'PVC', priceMultiplier: 0.7 },
  { value: 'wood', label: 'Wood', priceMultiplier: 1.4 },
];

const glassOptions = [
  { value: 'single', label: 'Single Glazing', priceAdd: 0 },
  { value: 'double', label: 'Double Glazing', priceAdd: 120 },
  { value: 'triple', label: 'Triple Glazing', priceAdd: 260 },
];

const colorOptions = [
  { value: '#1a1a1a', label: 'Charcoal' },
  { value: '#f5f0eb', label: 'Ivory' },
  { value: '#5c4033', label: 'Walnut' },
  { value: '#7a8b99', label: 'Slate' },
];

const BASE_PRICE = 380;

const Configurator: React.FC = () => {
  const [frameType, setFrameType] = useState('aluminum');
  const [glassType, setGlassType] = useState('double');
  const [color, setColor] = useState('#1a1a1a');
  const [quoteRequested, setQuoteRequested] = useState(false);

  const price = useMemo(() => {
    const frame = frameOptions.find(f => f.value === frameType)!;
    const glass = glassOptions.find(g => g.value === glassType)!;
    return Math.round(BASE_PRICE * frame.priceMultiplier + glass.priceAdd);
  }, [frameType, glassType]);

  return (
    <div className="configurator-page">
      <motion.div
        className="configurator-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Window Configurator</h1>
        <p>Design your perfect window system</p>
      </motion.div>

      <div className="configurator-layout">
        <motion.div
          className="configurator-controls"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Frame Type */}
          <div className="config-group">
            <label>Frame Material</label>
            <div className="config-options">
              {frameOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`config-option ${frameType === opt.value ? 'selected' : ''}`}
                  onClick={() => setFrameType(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Glass Type */}
          <div className="config-group">
            <label>Glazing</label>
            <div className="config-options">
              {glassOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`config-option ${glassType === opt.value ? 'selected' : ''}`}
                  onClick={() => setGlassType(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="config-group">
            <label>Frame Color</label>
            <div className="config-options">
              {colorOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`color-swatch ${color === opt.value ? 'selected' : ''}`}
                  style={{ background: opt.value }}
                  onClick={() => setColor(opt.value)}
                  title={opt.label}
                  aria-label={opt.label}
                />
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="price-display">
            <div className="price-label">Estimated Price</div>
            <div className="price-value">&euro;{price.toLocaleString()}</div>
          </div>

          {/* CTA */}
          {quoteRequested ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '1rem', background: '#e6f4ea', color: '#1a7f37', fontWeight: 600 }}
            >
              Quote request received. We will contact you shortly.
            </motion.div>
          ) : (
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => setQuoteRequested(true)}>
              Request Quote
            </button>
          )}
        </motion.div>

        {/* Preview */}
        <motion.div
          className="configurator-preview"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <WindowPreview frameType={frameType} glassType={glassType} color={color} />
        </motion.div>
      </div>
    </div>
  );
};

export default Configurator;
