export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menu: Category[] = [
  {
    id: 'classiques',
    name: 'Les Classiques',
    items: [
      { name: 'Margherita',      description: 'Tomate, mozzarella fior di latte, basilic frais',         price: 12 },
      { name: 'Pepperoni',       description: 'Tomate, mozzarella, pepperoni sélectionné',                price: 14 },
      { name: 'Regina',          description: 'Tomate, mozzarella, jambon de Paris, champignons',         price: 13 },
      { name: 'Quatre Fromages', description: 'Mozzarella, gorgonzola, chèvre, parmesan',                 price: 15 },
    ],
  },
  {
    id: 'speciales',
    name: 'Les Spéciales',
    items: [
      { name: 'La Fivezzza',  description: 'Tomate, mozzarella, burrata, roquette, tomates cerises',     price: 17 },
      { name: 'Truffe Noire', description: 'Crème, mozzarella, copeaux de truffe noire, parmesan',        price: 22 },
      { name: 'Diavola',      description: 'Tomate, mozzarella, salami épicé, piment de Calabre',         price: 15 },
      { name: 'Nduja',        description: 'Tomate, mozzarella, nduja calabraise, miel de fleurs',        price: 16 },
    ],
  },
  {
    id: 'vegetariennes',
    name: 'Les Végétariennes',
    items: [
      { name: 'Primavera',          description: 'Tomate, mozzarella, légumes grillés de saison',           price: 14 },
      { name: 'Épinards & Ricotta', description: 'Crème, mozzarella, épinards, ricotta, ail confit, pignons', price: 14 },
    ],
  },
];
