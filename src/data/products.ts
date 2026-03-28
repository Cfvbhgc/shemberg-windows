export interface Product {
  id: number;
  name: string;
  type: 'casement' | 'sliding' | 'fixed' | 'tilt-turn' | 'folding';
  material: string;
  image: string;
  description: string;
  price: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Atelier Casement 700',
    type: 'casement',
    material: 'Aluminum',
    image: '/images/window-1.jpg',
    description: 'Classic outward-opening casement window with slim aluminum profiles. Ideal for residential and commercial facades requiring maximum ventilation and unobstructed views.',
    price: 'from €420',
    features: ['Thermal break profile', 'Multi-point locking', 'Up to 1.4 W/m²K'],
  },
  {
    id: 2,
    name: 'Panorama Slide S90',
    type: 'sliding',
    material: 'Aluminum',
    image: '/images/window-2.jpg',
    description: 'Premium lift-and-slide system for floor-to-ceiling openings. Ultra-slim sightlines with exceptional weather performance.',
    price: 'from €1,280',
    features: ['Lift-and-slide mechanism', 'Triple glazing compatible', '90mm frame depth'],
  },
  {
    id: 3,
    name: 'Studio Fixed Lite',
    type: 'fixed',
    material: 'Aluminum',
    image: '/images/window-3.jpg',
    description: 'Non-operable fixed glazing panel engineered for maximum light transmission and minimal frame visibility in modern architecture.',
    price: 'from €310',
    features: ['Structural glazing option', 'Narrow 35mm sightline', 'Curtain wall integration'],
  },
  {
    id: 4,
    name: 'Classic Tilt-Turn CT5',
    type: 'tilt-turn',
    material: 'PVC',
    image: '/images/window-4.jpg',
    description: 'European-style tilt-and-turn window combining secure ventilation with full inward opening. Five-chamber PVC profile for superior insulation.',
    price: 'from €380',
    features: ['5-chamber profile', 'Tilt ventilation mode', 'Up to 0.9 W/m²K'],
  },
  {
    id: 5,
    name: 'Heritage Casement Oak',
    type: 'casement',
    material: 'Wood',
    image: '/images/window-5.jpg',
    description: 'Handcrafted solid oak casement window with traditional joinery and modern hardware. Designed for heritage and conservation projects.',
    price: 'from €720',
    features: ['FSC-certified oak', 'Period-correct profiles', 'Concealed hardware'],
  },
  {
    id: 6,
    name: 'Minimal Slide MS20',
    type: 'sliding',
    material: 'Aluminum',
    image: '/images/window-6.jpg',
    description: 'Ultra-minimal sliding door system with only 20mm visible interlock. Frameless appearance for seamless indoor-outdoor transitions.',
    price: 'from €2,100',
    features: ['20mm interlock', 'Flush threshold', 'Up to 3.5m height'],
  },
  {
    id: 7,
    name: 'Bi-Fold Series BF4',
    type: 'folding',
    material: 'Aluminum',
    image: '/images/window-7.jpg',
    description: 'Four-panel bi-folding door system that opens an entire wall to the outdoors. Smooth-gliding rollers and integrated drainage.',
    price: 'from €3,400',
    features: ['Up to 7 panels', 'Internal/external fold', 'Powder-coat finish'],
  },
  {
    id: 8,
    name: 'Efficiency Fixed EF1',
    type: 'fixed',
    material: 'PVC',
    image: '/images/window-8.jpg',
    description: 'Budget-conscious fixed glazing unit in multi-chamber PVC. Excellent thermal performance at an accessible price point for new builds.',
    price: 'from €210',
    features: ['6-chamber PVC', 'Triple glazing standard', 'Up to 0.7 W/m²K'],
  },
  {
    id: 9,
    name: 'Loft Tilt-Turn LT3',
    type: 'tilt-turn',
    material: 'Wood',
    image: '/images/window-1.jpg',
    description: 'Scandinavian pine tilt-turn window with aluminum exterior cladding. Combines the warmth of wood inside with weather-resistant metal outside.',
    price: 'from €560',
    features: ['Wood-aluminum composite', 'Micro-ventilation', 'Integrated blinds option'],
  },
  {
    id: 10,
    name: 'Grand Slide GS120',
    type: 'sliding',
    material: 'Aluminum',
    image: '/images/window-3.jpg',
    description: 'Oversized sliding system for prestige projects. Handles panels up to 500 kg with effortless one-finger operation.',
    price: 'from €4,600',
    features: ['500 kg panel capacity', '120mm frame depth', 'Motorized option'],
  },
];

export const windowTypes = ['all', 'casement', 'sliding', 'fixed', 'tilt-turn', 'folding'] as const;
