// Компонент сравнения До/После с перетаскиванием

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  title: string;
}

function BeforeAfter({ before, after, title }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback(function(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseMove = useCallback(function(e: MouseEvent) {
    if (!isDragging.current) return;
    e.preventDefault();
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseUp = useCallback(function() {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(function(e: React.MouseEvent) {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  // Cleanup listeners on unmount
  useEffect(function() {
    return function() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleTouchStart = useCallback(function(e: React.TouchEvent) {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleTouchMove = useCallback(function(e: React.TouchEvent) {
    if (!isDragging.current) return;
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleTouchEnd = useCallback(function() {
    isDragging.current = false;
  }, []);

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

        {/* Фото «До» — обрезается через clip-path */}
        <div
          className="before-after-overlay"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
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
