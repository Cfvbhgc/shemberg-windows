// Данные каталога продукции Shemberg Windows

export interface Product {
  id: number;
  name: string;
  type: 'поворотные' | 'раздвижные' | 'глухие' | 'откидные';
  material: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Panorama S1',
    type: 'раздвижные',
    material: 'Алюминий',
    description: 'Панорамная раздвижная система с минимальным профилем. Идеально для террас и балконов.',
    price: 48000,
    image: '/images/photo-1.jpg',
  },
  {
    id: 2,
    name: 'Classic Wood',
    type: 'поворотные',
    material: 'Дерево',
    description: 'Классическое деревянное окно с современной фурнитурой. Натуральная теплота дерева.',
    price: 35000,
    image: '/images/photo-2.jpg',
  },
  {
    id: 3,
    name: 'Arctic Thermo',
    type: 'глухие',
    material: 'ПВХ',
    description: 'Глухое энергосберегающее окно с тройным стеклопакетом. Максимальная теплоизоляция.',
    price: 22000,
    image: '/images/photo-3.jpg',
  },
  {
    id: 4,
    name: 'Ventus Air',
    type: 'откидные',
    material: 'Алюминий',
    description: 'Откидная система проветривания с автоматическим микропроветриванием.',
    price: 31000,
    image: '/images/photo-4.jpg',
  },
  {
    id: 5,
    name: 'Loft Industrial',
    type: 'глухие',
    material: 'Алюминий',
    description: 'Окно в стиле лофт с чёрным алюминиевым профилем и промышленной расстекловкой.',
    price: 42000,
    image: '/images/photo-5.jpg',
  },
  {
    id: 6,
    name: 'Slide Max',
    type: 'раздвижные',
    material: 'ПВХ',
    description: 'Раздвижная система с увеличенным световым проёмом. Тихий ход направляющих.',
    price: 38000,
    image: '/images/photo-6.jpg',
  },
  {
    id: 7,
    name: 'Europa Turn',
    type: 'поворотные',
    material: 'ПВХ',
    description: 'Европейская поворотная система с функцией микропроветривания и детским замком.',
    price: 26000,
    image: '/images/photo-7.jpg',
  },
  {
    id: 8,
    name: 'Premium Oak',
    type: 'поворотные',
    material: 'Дерево',
    description: 'Окно из массива дуба с энергосберегающим стеклопакетом. Премиальная отделка.',
    price: 65000,
    image: '/images/photo-8.jpg',
  },
  {
    id: 9,
    name: 'Tilt Comfort',
    type: 'откидные',
    material: 'ПВХ',
    description: 'Откидное окно с плавным механизмом открывания. Безопасность и комфорт.',
    price: 24000,
    image: '/images/photo-9.jpg',
  },
  {
    id: 10,
    name: 'Facade Glass',
    type: 'глухие',
    material: 'Алюминий',
    description: 'Фасадное остекление для коммерческих объектов. Структурный монтаж.',
    price: 55000,
    image: '/images/photo-10.jpg',
  },
];

export default products;
