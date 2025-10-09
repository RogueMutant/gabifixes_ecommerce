const categories = [
  {
    name: "Skincare",
    image: "/pearl_skin.jpg",
  },
  {
    name: "Makeup",
    image: "/mk_artist_2.jpg",
  },
  {
    name: "Haircare",
    image: "/shampoo_bath.jpg",
  },
];

export const productData = [
  {
    name: "Glow Serum",
    stock: 25,
    price: 29.99,
    image: ["/pearl_skin.jpg"] as [string],
    description: "A lightweight serum for radiant, hydrated skin.",
  },
  {
    name: "Velvet Lipstick",
    stock: 0,
    price: 19.99,
    image: ["/leave_in_conditioner.jpg"] as [string],
    description: "A rich, matte lipstick for a bold look.",
  },
  {
    name: "Hydrating Shampoo",
    stock: 15,
    price: 15.99,
    image: ["/shampoo_bath.jpg"] as [string],
    description: "A nourishing shampoo for all hair types.",
  },
  {
    name: "Sud Cleanser",
    stock: 0,
    price: 15.99,
    image: ["/shampoo_bath.jpg"] as [string],
    description: "A gentle cleanser for all skin types.",
  },
];

export default categories;
