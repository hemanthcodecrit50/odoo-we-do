import type { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Vintage Leather Jacket',
    description:
      'A beautifully preserved vintage leather jacket from the 80s. Features a classic bomber style with a warm inner lining. Perfect for adding a retro touch to any outfit. Minimal wear and tear, adding to its authentic character.',
    price: 120.0,
    imageUrl: 'https://picsum.photos/600/400?random=1',
    category: 'Apparel',
    seller: {
      id: 101,
      name: 'Retro Threads',
      avatarUrl: 'https://i.pravatar.cc/48?u=101',
    },
  },
  {
    id: 2,
    name: 'Mid-Century Modern Armchair',
    description:
      'An iconic mid-century modern armchair with original upholstery and solid teak wood frame. The fabric has a few minor blemishes but is otherwise in great condition for its age. A true statement piece for any living room.',
    price: 450.0,
    imageUrl: 'https://picsum.photos/600/400?random=2',
    category: 'Furniture',
    seller: {
      id: 102,
      name: 'Timeless Furnishings',
      avatarUrl: 'https://i.pravatar.cc/48?u=102',
    },
  },
  {
    id: 3,
    name: 'Classic Polaroid 600 Camera',
    description:
      'Get into instant photography with this classic Polaroid 600 camera. Tested and working perfectly. A fun and easy way to capture memories with a nostalgic feel. Film not included.',
    price: 75.0,
    imageUrl: 'https://picsum.photos/600/400?random=3',
    category: 'Electronics',
    seller: {
      id: 103,
      name: 'Analog Finds',
      avatarUrl: 'https://i.pravatar.cc/48?u=103',
    },
  },
  {
    id: 4,
    name: 'Set of Antique Teacups',
    description:
      'A delicate set of four antique porcelain teacups and saucers, featuring a hand-painted floral design with gold trim. No chips or cracks. Ideal for collectors or for enjoying a special high tea.',
    price: 95.0,
    imageUrl: 'https://picsum.photos/600/400?random=4',
    category: 'Home Goods',
    seller: {
      id: 101,
      name: 'Retro Threads',
      avatarUrl: 'https://i.pravatar.cc/48?u=101',
    },
  },
  {
    id: 5,
    name: 'Hand-knitted Wool Sweater',
    description:
      "A cozy, oversized hand-knitted sweater made from 100% merino wool. In a beautiful forest green color. Perfect for chilly evenings. In excellent, like-new condition.",
    price: 80.0,
    imageUrl: 'https://picsum.photos/600/400?random=5',
    category: 'Apparel',
    seller: {
      id: 104,
      name: 'Cozy Creations',
      avatarUrl: 'https://i.pravatar.cc/48?u=104',
    },
  },
  {
    id: 6,
    name: 'First Edition "The Hobbit"',
    description:
      'A rare find! A first edition, later printing of J.R.R. Tolkien\'s "The Hobbit". The book is in good condition for its age, with some wear on the dust jacket. A must-have for any serious book collector.',
    price: 850.0,
    imageUrl: 'https://picsum.photos/600/400?random=6',
    category: 'Books',
    seller: {
      id: 105,
      name: 'The Book Nook',
      avatarUrl: 'https://i.pravatar.cc/48?u=105',
    },
  },
  {
    id: 7,
    name: 'Retro Vinyl Record Player',
    description:
      'A suitcase-style record player that plays 33, 45, and 78 RPM records. Features built-in speakers and Bluetooth connectivity. Fully functional and ready to spin your favorite vinyl.',
    price: 60.0,
    imageUrl: 'https://picsum.photos/600/400?random=7',
    category: 'Electronics',
    seller: {
      id: 103,
      name: 'Analog Finds',
      avatarUrl: 'https://i.pravatar.cc/48?u=103',
    },
  },
  {
    id: 8,
    name: 'Rustic Wooden Bookshelf',
    description:
      'A sturdy, rustic bookshelf made from reclaimed barn wood. Provides ample storage with five shelves. Its natural imperfections give it a unique charm. Perfect for a farmhouse or industrial decor style.',
    price: 220.0,
    imageUrl: 'https://picsum.photos/600/400?random=8',
    category: 'Furniture',
    seller: {
      id: 102,
      name: 'Timeless Furnishings',
      avatarUrl: 'https://i.pravatar.cc/48?u=102',
    },
  },
];
