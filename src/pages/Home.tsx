// Главная страница — hero, преимущества, CTA

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuoteForm from '../components/QuoteForm';

function Home() {
  const advantages = [
    {
      icon: '◆',
      title: 'Немецкое качество',
      text: 'Профили VEKA и Schüco. Фурнитура Roto и Siegenia.',
    },
    {
      icon: '◇',
      title: 'Энергоэффективность',
      text: 'Тройные стеклопакеты с аргоном. Класс A по теплоизоляции.',
    },
    {
      icon: '○',
      title: 'Монтаж по ГОСТ',
      text: 'Сертифицированные бригады. Гарантия 10 лет на монтаж.',
    },
    {
      icon: '□',
      title: 'Собственное производство',
      text: 'Полный цикл от замера до установки за 7 рабочих дней.',
    },
  ];

  return (
    <div className="home">
      {/* Hero секция */}
      <section className="hero">
        <div className="hero-bg">
          <img src="images/photo-1.jpg" alt="Панорамное окно" />
          <div className="hero-overlay" />
        </div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">
            Окна и двери<br />
            <span>нового поколения</span>
          </h1>
          <p className="hero-subtitle">
            Архитектурное остекление для жилых и коммерческих объектов.
            Немецкие технологии, российское производство.
          </p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn-primary">Каталог продукции</Link>
            <Link to="/configurator" className="btn-outline">3D Конфигуратор</Link>
          </div>
        </motion.div>
      </section>

      {/* Преимущества */}
      <section className="advantages">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Почему Shemberg
          </motion.h2>
          <div className="advantages-grid">
            {advantages.map(function(item, index) {
              return (
                <motion.div
                  key={index}
                  className="advantage-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <span className="advantage-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Витрина — 3 фото */}
      <section className="showcase">
        <div className="container">
          <div className="showcase-grid">
            <motion.div
              className="showcase-item large"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src="images/photo-5.jpg" alt="Остекление фасада" />
              <div className="showcase-label">Фасадное остекление</div>
            </motion.div>
            <motion.div
              className="showcase-item"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img src="images/photo-8.jpg" alt="Интерьер" />
              <div className="showcase-label">Интерьерные решения</div>
            </motion.div>
            <motion.div
              className="showcase-item"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img src="images/photo-11.jpg" alt="Раздвижные двери" />
              <div className="showcase-label">Раздвижные системы</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA — форма заявки */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-text">
              <h2>Рассчитайте стоимость</h2>
              <p>
                Оставьте заявку, и наш инженер подготовит индивидуальный расчёт
                с учётом особенностей вашего объекта.
              </p>
              <div className="cta-stats">
                <div className="stat">
                  <strong>1200+</strong>
                  <span>объектов</span>
                </div>
                <div className="stat">
                  <strong>10 лет</strong>
                  <span>гарантия</span>
                </div>
                <div className="stat">
                  <strong>7 дней</strong>
                  <span>срок</span>
                </div>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
