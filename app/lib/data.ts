import { CartItem, IProduct, IReview } from "./custom";

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

export const productData: IProduct[] = [
  {
    id: "1",
    name: "Glow Serum",
    stock: 25,
    price: 29.99,
    image: ["/pearl_skin.jpg", "/pearl_skin.jpg"],
    description: "A lightweight serum for radiant, hydrated skin.",
    ingredients: "Niacinamide, Hyaluronic Acid, Vitamin C",
    howToUse:
      "Apply 2-3 drops to clean skin morning and night. Follow with moisturizer.",
    reviews: [],
  },
  {
    id: "2",
    name: "Velvet Lipstick",
    stock: 0,
    price: 19.99,
    image: ["/leave_in_conditioner.jpg", "/leave_in_conditioner.jpg"],
    description: "A rich, matte lipstick for a bold look.",
    ingredients: "Beeswax, Castor Oil, Pigments",
    howToUse: "Swipe directly onto lips or use a brush for precision.",
    reviews: [],
  },
  {
    id: "3",
    name: "Hydrating Shampoo",
    stock: 15,
    price: 15.99,
    image: ["/shampoo_bath.jpg", "/shampoo_bath.jpg"],
    description: "A nourishing shampoo for all hair types.",
    ingredients: "Aloe Vera, Coconut Oil, Panthenol",
    howToUse: "Massage into wet hair, lather, and rinse thoroughly.",
    reviews: [],
  },
  {
    id: "4",
    name: "Sud Cleanser",
    stock: 0,
    price: 15.99,
    image: ["/shampoo_bath.jpg"],
    description: "A gentle cleanser for all skin types.",
    ingredients: "Green Tea Extract, Glycerin, Chamomile",
    howToUse:
      "Apply to damp face, massage gently, and rinse with lukewarm water.",
    reviews: [],
  },
];

export const reviewsData: IReview[] = [
  {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Amina Yusuf",
    review:
      "Absolutely love this serum! My skin feels smoother and looks brighter after just a week.",
    rating: 5,
    created_at: "2025-10-12T09:30:00Z",
  },
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Okoro",
    review:
      "Great texture and absorbs quickly. Not greasy at all. Will definitely repurchase.",
    rating: 4,
    created_at: "2025-09-28T14:15:00Z",
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Chidera Nwosu",
    review:
      "I had high hopes but it didn't work well for my sensitive skin. Caused mild irritation.",
    rating: 2,
    created_at: "2025-08-19T18:45:00Z",
  },
  {
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Tunde Balogun",
    review:
      "The scent is amazing and my skin feels hydrated all day. Highly recommend!",
    rating: 5,
    created_at: "2025-11-01T07:20:00Z",
  },
];
export default categories;

export const CartData: CartItem[] = [
  {
    id: "1",
    name: "Hydrating Face Serum",
    size: "100ml",
    quantity: 1,
    price: 45,
    image: "/pearl_skin.jpg",
  },
];
