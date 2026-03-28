// Компонент сравнения До/После с перетаскиванием

import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  title: string;
}

function BeforeAfter({ before, after, title }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback(function(clientX: number) {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  function handleMouseDown() {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    handleMove(e.clientX);
  }

  function handleMouseUp() {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  function handleTouchStart() {
    isDragging.current = true;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (isDragging.current) {
      handleMove(e.touches[0].clientX);
    }
  }

  function handleTouchEnd() {
    isDragging.current = false;
  }

  return (
    <div className="before-after">
      <h3 className="before-after-title">{title}</h3>
      <div
        className="before-after-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Фото «После» — фон */}
        <img src={after} alt="После" className="before-after-img" />

        {/* Фото «До» — обрезается */}
        <div
          className="before-after-overlay"
          style={{ width: `${position}%` }}
        >
          <img src={before} alt="До" className="before-after-img" />
        </div>

        {/* Ползунок */}
        <div
          className="before-after-slider"
          style={{ left: `${position}%` }}
        >
          <div className="before-after-handle">
            <span>◄</span>
            <span>►</span>
          </div>
        </div>

        {/* Подписи */}
        <span className="before-after-label label-before">До</span>
        <span className="before-after-label label-after">После</span>
      </div>
    </div>
  );
}

export default BeforeAfter;
