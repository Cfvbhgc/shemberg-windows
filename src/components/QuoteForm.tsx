// Пошаговая форма заявки на расчёт

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  windowType: string;
  width: string;
  height: string;
  quantity: string;
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    windowType: '',
    width: '',
    height: '',
    quantity: '1',
    name: '',
    phone: '',
    email: '',
  });

  function updateField(field: keyof FormData, value: string) {
    setFormData({ ...formData, [field]: value });
    // Убираем ошибку при изменении
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  }

  function validateStep(currentStep: number): boolean {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.windowType) newErrors.windowType = 'Выберите тип окна';
    }

    if (currentStep === 2) {
      if (!formData.width || Number(formData.width) < 300) newErrors.width = 'Мин. ширина 300 мм';
      if (!formData.height || Number(formData.height) < 300) newErrors.height = 'Мин. высота 300 мм';
      if (!formData.quantity || Number(formData.quantity) < 1) newErrors.quantity = 'Мин. 1 шт.';
    }

    if (currentStep === 3) {
      if (!formData.name.trim()) newErrors.name = 'Введите имя';
      // eslint-disable-next-line
      if (!formData.phone.match(/^[\d\s\+\-\(\)]{7,}$/)) newErrors.phone = 'Введите корректный номер';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Введите корректный email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    setStep(step - 1);
  }

  function handleSubmit() {
    if (validateStep(3)) {
      setSubmitted(true);
    }
  }

  const windowTypes = ['Поворотные', 'Раздвижные', 'Глухие', 'Откидные', 'Поворотно-откидные'];

  if (submitted) {
    return (
      <motion.div
        className="quote-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="success-icon">✓</div>
        <h3>Заявка отправлена</h3>
        <p>Мы свяжемся с вами в течение 24 часов для расчёта стоимости.</p>
      </motion.div>
    );
  }

  return (
    <div className="quote-form">
      {/* Индикатор шагов */}
      <div className="steps-indicator">
        {[1, 2, 3].map(function(s) {
          return (
            <div key={s} className={`step-dot ${s === step ? 'active' : ''} ${s < step ? 'done' : ''}`}>
              <span>{s < step ? '✓' : s}</span>
              <small>{s === 1 ? 'Тип' : s === 2 ? 'Размеры' : 'Контакты'}</small>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Шаг 1: Тип окна */}
        {step === 1 && (
          <motion.div
            key="step1"
            className="form-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3>Выберите тип окна</h3>
            <div className="type-grid">
              {windowTypes.map(function(type) {
                return (
                  <button
                    key={type}
                    className={`type-option ${formData.windowType === type ? 'selected' : ''}`}
                    onClick={() => updateField('windowType', type)}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
            {errors.windowType && <p className="form-error">{errors.windowType}</p>}
            <div className="form-actions">
              <button className="btn-next" onClick={nextStep}>Далее</button>
            </div>
          </motion.div>
        )}

        {/* Шаг 2: Размеры */}
        {step === 2 && (
          <motion.div
            key="step2"
            className="form-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3>Укажите размеры</h3>
            <div className="size-inputs">
              <div className="input-group">
                <label>Ширина (мм)</label>
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => updateField('width', e.target.value)}
                  placeholder="1200"
                />
                {errors.width && <p className="form-error">{errors.width}</p>}
              </div>
              <div className="input-group">
                <label>Высота (мм)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  placeholder="1400"
                />
                {errors.height && <p className="form-error">{errors.height}</p>}
              </div>
              <div className="input-group">
                <label>Количество</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => updateField('quantity', e.target.value)}
                  min="1"
                />
                {errors.quantity && <p className="form-error">{errors.quantity}</p>}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-back" onClick={prevStep}>Назад</button>
              <button className="btn-next" onClick={nextStep}>Далее</button>
            </div>
          </motion.div>
        )}

        {/* Шаг 3: Контакты */}
        {step === 3 && (
          <motion.div
            key="step3"
            className="form-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3>Контактные данные</h3>
            <div className="contact-inputs">
              <div className="input-group">
                <label>Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Иван Петров"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div className="input-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="ivan@mail.ru"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-back" onClick={prevStep}>Назад</button>
              <button className="btn-submit" onClick={handleSubmit}>Отправить заявку</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default QuoteForm;
