import React, { useState, useRef, useCallback } from 'react';

interface Props {
  beforeImage: string;
  afterImage: string;
  title: string;
}

const ComparisonSlider: React.FC<Props> = ({ beforeImage, afterImage, title }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div>
      <h3 className="comparison-title">{title}</h3>
      <div
        ref={containerRef}
        className="comparison-slider"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img src={beforeImage} alt="Before" />
        <img
          src={afterImage}
          alt="After"
          className="after-image"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <div className="comparison-handle" style={{ left: `${position}%` }} />
        <span className="comparison-label before-label">Before</span>
        <span className="comparison-label after-label">After</span>
      </div>
    </div>
  );
};

export default ComparisonSlider;
