import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const Home: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/images/hero-facade.jpg)' }} />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1>SHEMBERG</h1>
          <p>Premium Window Systems</p>
        </motion.div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* About */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        <span className="section-label">About Us</span>
        <h2 className="section-title">Engineering Light,<br />Framing Views</h2>
        <p className="section-text">
          For over three decades, Shemberg has defined the standard in premium European
          window and facade systems. From minimalist aluminum profiles to heritage timber
          casements, every product is engineered for lasting beauty, thermal performance,
          and architectural precision.
        </p>
      </motion.section>

      {/* Features */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        <span className="section-label">Why Shemberg</span>
        <h2 className="section-title">Built to Perform</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#9670;</div>
            <h3>Thermal Excellence</h3>
            <p>Industry-leading U-values down to 0.7 W/m2K. Multi-chamber profiles and warm-edge spacers minimize heat loss year-round.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#9674;</div>
            <h3>Slim Sightlines</h3>
            <p>Profiles as narrow as 20mm at the interlock. Maximum glass area for unobstructed views and natural daylight.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#9632;</div>
            <h3>Custom Finishes</h3>
            <p>Over 200 RAL colors, anodized finishes, and natural wood stains. Dual-color options for contrasting interior and exterior tones.</p>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        className="cta-banner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <h2>Design Your Window</h2>
        <p>Use our configurator to explore frame types, glazing options, and finishes.</p>
        <Link to="/configurator" className="btn-primary">Open Configurator</Link>
      </motion.div>

      {/* Stats */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{ textAlign: 'center' as const }}
      >
        <div className="features-grid">
          <div className="feature-card">
            <h3 style={{ fontSize: '2.4rem', color: 'var(--accent)' }}>30+</h3>
            <p>Years of experience in premium fenestration</p>
          </div>
          <div className="feature-card">
            <h3 style={{ fontSize: '2.4rem', color: 'var(--accent)' }}>12,000+</h3>
            <p>Projects delivered across Europe</p>
          </div>
          <div className="feature-card">
            <h3 style={{ fontSize: '2.4rem', color: 'var(--accent)' }}>45</h3>
            <p>Countries with authorized partners</p>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
