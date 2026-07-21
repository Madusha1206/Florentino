export const categoryPaths = {
  'Balloon Hampers': '/catalog/ballon-hampers',
  'Balloon Hampers with Gifts': '/catalog/ballon-hampers-with-gifts',
  Brownies: '/catalog/brownies',
  'Brownies with Gifts': '/catalog/brownies-with-gifts',
  'Cake with Flower Bunch': '/catalog/cake-with-flower-bunch',
  Cakes: '/catalog/cakes',
  'Flower Bunches': '/catalog/flower-bunches',
  'Money Bunches': '/catalog/money-bunches',
  'Rose Bunches': '/catalog/rose-bunches',
  Teddies: '/catalog/teddies',
  'Wedding Bouquets': '/catalog/wedding-bouquets',
};

export const getCategoryPath = (category) => categoryPaths[category] || '/catalog';