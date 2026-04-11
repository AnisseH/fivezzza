export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
  note?: { label: string; detail: string; price: number };
}

export const menu: Category[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    items: [
      {
        name: 'Margherita',
        description: 'Tomate, mozzarella fior di latte, pecorino romano, basilic',
        price: 10,
      },
      {
        name: 'Végé',
        description: 'Tomate, mozzarella fior di latte, légumes du moment, artichaut à la romaine, tomate séchée, origan',
        price: 13,
      },
      {
        name: 'Cheesy',
        description: 'Tomate, mozzarella fior di latte, gorgonzola, pecorino romano, persillade maison',
        price: 14,
      },
      {
        name: 'Regina',
        description: 'Tomate, mozzarella fior di latte, champignons de paris, jambon, persillade maison',
        price: 15,
      },
    ],
    note: { label: 'Suppléments', detail: '½ burrata ou jambon', price: 3 },
  },
  {
    id: 'antipasti',
    name: 'Antipasti',
    items: [
      {
        name: 'Burrata',
        description: 'Tomate séchée avec huile d\'olive, basilic, tranches de pain maison',
        price: 9,
      },
      {
        name: 'Focaccia',
        description: 'Pain italien à l\'huile d\'olive, fleur de sel, romarin',
        price: 5,
      },
    ],
  },
  {
    id: 'dessert',
    name: 'Dessert',
    items: [
      {
        name: 'Pizza Nocciolata',
        description: '',
        price: 5,
      },
      {
        name: 'Mousse au chocolat',
        description: 'Faite maison et avec amour, comme tout ce que nous servons \u2665',
        price: 5,
      },
    ],
  },
];
