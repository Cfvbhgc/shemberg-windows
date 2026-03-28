// 3D Конфигуратор окна на Three.js

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Настройки конфигуратора
interface WindowConfig {
  profile: 'aluminium' | 'pvc' | 'wood';
  color: string;
  glass: 'clear' | 'frosted' | 'tinted';
}

// Цвета профилей
const profileColors: Record<string, Record<string, string>> = {
  aluminium: {
    'Белый': '#f0f0f0',
    'Антрацит': '#3a3a3a',
    'Серебро': '#b0b0b0',
    'Чёрный': '#1a1a1a',
    'Золотой дуб': '#b8860b',
  },
  pvc: {
    'Белый': '#fafafa',
    'Антрацит': '#444444',
    'Серебро': '#c0c0c0',
    'Чёрный': '#222222',
    'Золотой дуб': '#c49a3c',
  },
  wood: {
    'Белый': '#f5e6d3',
    'Антрацит': '#5a4a3a',
    'Серебро': '#c8b8a8',
    'Чёрный': '#3a2a1a',
    'Золотой дуб': '#a0722a',
  },
};

// Расчёт цены
function calculatePrice(config: WindowConfig): number {
  const basePrices = { aluminium: 42000, pvc: 24000, wood: 55000 };
  const glassMultiplier = { clear: 1.0, frosted: 1.15, tinted: 1.25 };
  return Math.round(basePrices[config.profile] * glassMultiplier[config.glass]);
}

// 3D модель окна
function WindowModel({ config }: { config: WindowConfig }) {
  const groupRef = useRef<THREE.Group>(null);

  // Плавное вращение
  useFrame(function(state) {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  // Цвет рамы
  const frameColor = useMemo(function() {
    const colors = profileColors[config.profile];
    const colorName = Object.keys(colors).find(function(k) {
      return colors[k] === config.color;
    }) || Object.keys(colors)[0];
    return colors[colorName] || config.color;
  }, [config.profile, config.color]);

  // Материал стекла
  const glassMaterial = useMemo(function() {
    const props: any = {
      transparent: true,
      side: THREE.DoubleSide,
    };
    switch (config.glass) {
      case 'frosted':
        props.color = '#e8e8e8';
        props.opacity = 0.6;
        props.roughness = 0.8;
        break;
      case 'tinted':
        props.color = '#6a8faf';
        props.opacity = 0.5;
        props.roughness = 0.1;
        break;
      default:
        props.color = '#c8dde8';
        props.opacity = 0.2;
        props.roughness = 0.05;
    }
    return props;
  }, [config.glass]);

  // Шероховатость рамы зависит от материала
  const frameRoughness = config.profile === 'wood' ? 0.7 : config.profile === 'pvc' ? 0.4 : 0.2;

  const frameWidth = 0.12;
  const windowW = 2.4;
  const windowH = 3.0;
  const depth = 0.15;
  const halfW = windowW / 2;
  const halfH = windowH / 2;

  return (
    <group ref={groupRef}>
      {/* Верхняя перекладина */}
      <mesh position={[0, halfH - frameWidth / 2, 0]}>
        <boxGeometry args={[windowW, frameWidth, depth]} />
        <meshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={config.profile === 'aluminium' ? 0.8 : 0.1} />
      </mesh>

      {/* Нижняя перекладина */}
      <mesh position={[0, -halfH + frameWidth / 2, 0]}>
        <boxGeometry args={[windowW, frameWidth, depth]} />
        <meshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={config.profile === 'aluminium' ? 0.8 : 0.1} />
      </mesh>

      {/* Левая стойка */}
      <mesh position={[-halfW + frameWidth / 2, 0, 0]}>
        <boxGeometry args={[frameWidth, windowH - frameWidth * 2, depth]} />
        <meshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={config.profile === 'aluminium' ? 0.8 : 0.1} />
      </mesh>

      {/* Правая стойка */}
      <mesh position={[halfW - frameWidth / 2, 0, 0]}>
        <boxGeometry args={[frameWidth, windowH - frameWidth * 2, depth]} />
        <meshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={config.profile === 'aluminium' ? 0.8 : 0.1} />
      </mesh>

      {/* Средняя перекладина (горизонтальная) */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[windowW - frameWidth * 2, frameWidth * 0.7, depth]} />
        <meshStandardMaterial color={frameColor} roughness={frameRoughness} metalness={config.profile === 'aluminium' ? 0.8 : 0.1} />
      </mesh>

      {/* Стекло верхнее */}
      <mesh position={[0, halfH / 2 + 0.15, 0]}>
        <planeGeometry args={[windowW - frameWidth * 2 - 0.02, windowH / 2 - frameWidth - 0.05]} />
        <meshPhysicalMaterial {...glassMaterial} transmission={config.glass === 'clear' ? 0.9 : 0.5} thickness={0.5} />
      </mesh>

      {/* Стекло нижнее */}
      <mesh position={[0, -halfH / 2 + 0.15, 0]}>
        <planeGeometry args={[windowW - frameWidth * 2 - 0.02, windowH / 2 - frameWidth - 0.05]} />
        <meshPhysicalMaterial {...glassMaterial} transmission={config.glass === 'clear' ? 0.9 : 0.5} thickness={0.5} />
      </mesh>

      {/* Ручка */}
      <mesh position={[halfW - frameWidth - 0.15, 0, depth / 2 + 0.02]}>
        <boxGeometry args={[0.03, 0.12, 0.04]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Configurator() {
  const [config, setConfig] = useState<WindowConfig>({
    profile: 'aluminium',
    color: '#f0f0f0',
    glass: 'clear',
  });

  const profileLabels = {
    aluminium: 'Алюминий',
    pvc: 'ПВХ',
    wood: 'Дерево',
  };

  const glassLabels = {
    clear: 'Прозрачное',
    frosted: 'Матовое',
    tinted: 'Тонированное',
  };

  const price = calculatePrice(config);
  const currentColors = profileColors[config.profile];

  return (
    <div className="configurator-page">
      <div className="container">
        <div className="config-header">
          <h1>3D Конфигуратор</h1>
          <p>Соберите окно под ваш проект. Вращайте модель мышкой.</p>
        </div>

        <div className="config-layout">
          {/* 3D сцена */}
          <div className="config-canvas">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <directionalLight position={[-3, 3, -3]} intensity={0.3} />
              <WindowModel config={config} />
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3}
                maxDistance={8}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
              <Environment preset="studio" />
            </Canvas>
          </div>

          {/* Панель настроек */}
          <div className="config-panel">
            {/* Тип профиля */}
            <div className="config-section">
              <h3>Тип профиля</h3>
              <div className="config-options">
                {(Object.keys(profileLabels) as Array<keyof typeof profileLabels>).map(function(key) {
                  return (
                    <button
                      key={key}
                      className={`config-btn ${config.profile === key ? 'active' : ''}`}
                      onClick={() => {
                        const firstColor = Object.values(profileColors[key])[0];
                        setConfig({ ...config, profile: key, color: firstColor });
                      }}
                    >
                      {profileLabels[key]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Цвет */}
            <div className="config-section">
              <h3>Цвет</h3>
              <div className="color-options">
                {Object.entries(currentColors).map(function([name, hex]) {
                  return (
                    <button
                      key={name}
                      className={`color-swatch ${config.color === hex ? 'active' : ''}`}
                      style={{ backgroundColor: hex }}
                      onClick={() => setConfig({ ...config, color: hex })}
                      title={name}
                    >
                      <span className="color-name">{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Стекло */}
            <div className="config-section">
              <h3>Тип стекла</h3>
              <div className="config-options">
                {(Object.keys(glassLabels) as Array<keyof typeof glassLabels>).map(function(key) {
                  return (
                    <button
                      key={key}
                      className={`config-btn ${config.glass === key ? 'active' : ''}`}
                      onClick={() => setConfig({ ...config, glass: key })}
                    >
                      {glassLabels[key]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Спецификации */}
            <div className="config-specs">
              <h3>Спецификации</h3>
              <div className="spec-row"><span>Профиль:</span><span>{profileLabels[config.profile]}</span></div>
              <div className="spec-row"><span>Стеклопакет:</span><span>двухкамерный, 40 мм</span></div>
              <div className="spec-row"><span>Фурнитура:</span><span>Roto NT</span></div>
              <div className="spec-row"><span>Теплоизоляция:</span><span>0.8 Вт/(м²·К)</span></div>
              <div className="spec-row"><span>Шумоизоляция:</span><span>до 42 дБ</span></div>
            </div>

            {/* Цена */}
            <div className="config-price">
              <div className="price-label">Расчётная стоимость</div>
              <div className="price-value">от {price.toLocaleString('ru-RU')} ₽</div>
              <button className="btn-primary full-width">Заказать расчёт</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configurator;
