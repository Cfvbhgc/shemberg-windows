// Данные галереи проектов

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
}

export interface BeforeAfterItem {
  id: number;
  before: string;
  after: string;
  title: string;
}

export const galleryItems: GalleryItem[] = [
  { id: 1, image: '/images/photo-1.jpg', title: 'Панорамное остекление виллы', category: 'Частные дома' },
  { id: 2, image: '/images/photo-4.jpg', title: 'Алюминиевый фасад офиса', category: 'Коммерческие' },
  { id: 3, image: '/images/photo-7.jpg', title: 'Окна в скандинавском стиле', category: 'Квартиры' },
  { id: 4, image: '/images/photo-8.jpg', title: 'Деревянные окна загородного дома', category: 'Частные дома' },
  { id: 5, image: '/images/photo-10.jpg', title: 'Структурное остекление бизнес-центра', category: 'Коммерческие' },
  { id: 6, image: '/images/photo-11.jpg', title: 'Французские окна в пол', category: 'Квартиры' },
  { id: 7, image: '/images/photo-13.jpg', title: 'Мансардное остекление', category: 'Частные дома' },
  { id: 8, image: '/images/photo-14.jpg', title: 'Витражное остекление лестницы', category: 'Коммерческие' },
];

export const beforeAfterItems: BeforeAfterItem[] = [
  { id: 1, before: '/images/photo-2.jpg', after: '/images/photo-5.jpg', title: 'Замена деревянных на алюминиевые' },
  { id: 2, before: '/images/photo-3.jpg', after: '/images/photo-6.jpg', title: 'Установка панорамного остекления' },
  { id: 3, before: '/images/photo-9.jpg', after: '/images/photo-12.jpg', title: 'Модернизация фасада здания' },
];
