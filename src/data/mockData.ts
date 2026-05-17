export interface Product {
  id: string;
  name: string;
  nameTe: string; // Telugu name
  price: number;
  originalPrice?: number;
  category: 'sarees' | 'lehengas' | 'kurta-sets' | 'fabrics' | 'custom-blouses' | 'menswear';
  images: string[];
  videoUrl?: string;
  description: string;
  descriptionTe: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  variants: {
    sizes?: string[];
    colors?: { name: string; hex: string }[];
    meters?: number[];
  };
  fabricDetails?: {
    gsm: number;
    composition: string;
    weave: string;
    care: string;
  };
  stockStatus: 'ready_stock' | 'preorder' | 'out_of_stock';
  inventory: number;
  codAvailable: boolean;
  seoTitle: string;
  seoMeta: string;
  published: boolean;
  scheduledDate?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
    selectedMeters?: number;
    isCustomStitching?: boolean;
    stitchingDetails?: any;
  }[];
  totalAmount: number;
  paymentMethod: 'PREPAID_RAZORPAY' | 'COD';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  orderStatus: 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  pincode: string;
  createdAt: string;
  whatsappNotified: boolean;
  telegramNotified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  titleTe: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Royal Crimson Kanjivaram Pure Silk Saree',
    nameTe: 'రాయల్ క్రిమ్సన్ కంచిపట్టు స్వచ్ఛమైన పట్టు చీర',
    price: 24500,
    originalPrice: 28900,
    category: 'sarees',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-elegant-traditional-saree-twirling-41584-large.mp4',
    description: 'Experience pure opulence with our masterfully handwoven Kanjivaram silk saree. Adorned with authentic pure gold zari brocade work depicting mythological peacocks and celestial floral vines. Perfect for bridal wear and elite festival celebrations.',
    descriptionTe: 'మా నిపుణులైన చేనేత కార్మికులు నేసిన స్వచ్ఛమైన కంచిపట్టు చీరతో రాజసాన్ని అనుభవించండి. స్వచ్ఛమైన బంగారు జరీ బ్రోకేడ్ పనితనంతో అలరారుతోంది.',
    rating: 4.9,
    reviewsCount: 42,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    tags: ['Bridal', 'Silk', 'Kanjivaram', 'Luxury', 'Handloom'],
    variants: {
      colors: [
        { name: 'Crimson Red', hex: '#990000' },
        { name: 'Peacock Green', hex: '#004d40' },
        { name: 'Royal Gold', hex: '#b8860b' }
      ]
    },
    fabricDetails: {
      gsm: 110,
      composition: '100% Pure Mulberry Silk with 3G Gold Zari',
      weave: 'Handloom Kanjivaram Interlocking Weave',
      care: 'Dry Clean Only. Store in a breathable cotton muslin bag.'
    },
    stockStatus: 'ready_stock',
    inventory: 12,
    codAvailable: true,
    seoTitle: 'Royal Crimson Kanjivaram Pure Silk Saree | Deeprastore Luxury Bridal',
    seoMeta: 'Buy authentic Handloom Kanjivaram Pure Silk Saree with pure gold zari online at Deeprastore. Premium bridal sarees with express shipping.',
    published: true
  },
  {
    id: 'prod-2',
    name: 'Emerald Velvet Embroidered Bridal Lehenga',
    nameTe: 'ఎమరాల్డ్ వెల్వెట్ ఎంబ్రాయిడరీ బ్రైడల్ లెహెంగా',
    price: 42000,
    originalPrice: 49000,
    category: 'lehengas',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566560987971-5ab35a782b13?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A spectacular emerald green micro-velvet lehenga featuring intricate zardozi, dabka, and crystal embroidery. Accompanied by a heavy net dupatta and a fully embroidered silk blouse piece.',
    descriptionTe: 'జర్‌దోసి మరియు క్రిస్టల్ ఎంబ్రాయిడరీతో కూడిన అద్భుతమైన ఎమరాల్డ్ గ్రీన్ వెల్వెట్ లెహెంగా.',
    rating: 4.8,
    reviewsCount: 18,
    isTrending: true,
    tags: ['Lehenga', 'Bridal', 'Velvet', 'Zardozi', 'Premium'],
    variants: {
      sizes: ['S (32)', 'M (34)', 'L (36)', 'XL (38)', 'Custom Stitching']
    },
    fabricDetails: {
      gsm: 280,
      composition: 'Premium Micro Velvet & Pure Silk Lining',
      weave: 'Dense Velvet with Hand Zardozi Embroidery',
      care: 'Professional Dry Clean Only.'
    },
    stockStatus: 'ready_stock',
    inventory: 5,
    codAvailable: false, // High value
    seoTitle: 'Emerald Velvet Embroidered Bridal Lehenga | Deeprastore',
    seoMeta: 'Shop the stunning Emerald Velvet Bridal Lehenga with heavy zardozi hand embroidery. Custom stitching available.',
    published: true
  },
  {
    id: 'prod-3',
    name: 'Premium Banarasi Chanderi Silk Fabric (Per Meter)',
    nameTe: 'ప్రీమియం బనారసి చందేరి పట్టు ఫ్యాబ్రిక్ (మీటరుకు)',
    price: 850,
    originalPrice: 1200,
    category: 'fabrics',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607656311408-1e43fe4e50fa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Exquisite Banarasi Chanderi silk fabric with all-over gold zari butti work. Ideal for designing bespoke anarkalis, luxury kurtas, and designer blouses. Meter-based pricing with continuous cut guarantee.',
    descriptionTe: 'అందమైన బనారసి చందేరి పట్టు ఫ్యాబ్రిక్, జరీ బుట్టీ వర్క్ తో. కస్టమ్ డిజైన్లకు అనుకూలం.',
    rating: 4.9,
    reviewsCount: 56,
    isBestSeller: true,
    tags: ['Fabric', 'Silk', 'Banarasi', 'Unstitched', 'Bespoke'],
    variants: {
      colors: [
        { name: 'Rose Gold', hex: '#b76e79' },
        { name: 'Midnight Blue', hex: '#003366' },
        { name: 'Ivory White', hex: '#fffff0' },
        { name: 'Mustard Yellow', hex: '#ffdb58' }
      ],
      meters: [1, 2, 3, 4, 5, 10]
    },
    fabricDetails: {
      gsm: 85,
      composition: '80% Chanderi Silk, 20% Tested Gold Zari',
      weave: 'Traditional Banarasi Handloom Weave',
      care: 'Gentle Hand Wash or Dry Clean.'
    },
    stockStatus: 'ready_stock',
    inventory: 250, // meters
    codAvailable: true,
    seoTitle: 'Premium Banarasi Chanderi Silk Fabric Online | Deeprastore Fabrics',
    seoMeta: 'Buy Premium Banarasi Chanderi Silk fabric per meter online. Perfect for custom kurtas, blouses, and lehengas.',
    published: true
  },
  {
    id: 'prod-4',
    name: 'Bespoke Designer Blouse - Custom Stitching Service',
    nameTe: 'డిజైనర్ బ్లౌజ్ - కస్టమ్ స్టిచ్చింగ్ సర్వీస్',
    price: 3499,
    originalPrice: 4500,
    category: 'custom-blouses',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Get a flawlessly tailored designer blouse crafted to your exact measurements by Deeprastore master tailors. Upload your measurements, pick your neckline, and attach a reference photo. Includes premium cotton lining, padded cups, and expert finishing.',
    descriptionTe: 'మీ కొలతలకు సరిగ్గా సరిపోయే డిజైనర్ బ్లౌజ్ కుట్టించుకోండి. మా అనుభవజ్ఞులైన టైలర్లచే ప్రత్యేకంగా రూపొందించబడుతుంది.',
    rating: 5.0,
    reviewsCount: 34,
    isNew: true,
    tags: ['Custom Stitching', 'Tailoring', 'Blouse', 'Bespoke', 'Designer'],
    variants: {
      sizes: ['Custom Measurements Upload']
    },
    fabricDetails: {
      gsm: 120,
      composition: 'Client Choice / Premium Silk & Pure Cotton Lining',
      weave: 'Custom Tailored with Padded Support',
      care: 'Dry Clean Recommended.'
    },
    stockStatus: 'preorder',
    inventory: 100,
    codAvailable: false, // Custom tailored
    seoTitle: 'Custom Stitching Designer Blouse Online | Deeprastore Tailoring',
    seoMeta: 'Order bespoke custom stitched designer blouses online. Upload your measurements and reference design for perfect fitting.',
    published: true
  },
  {
    id: 'prod-5',
    name: 'Ivory Pashmina Silk Men\'s Achkan Sherwani Set',
    nameTe: 'ఐవరీ పష్మినా పట్టు పురుషుల అచ్కన్ షేర్వాణీ సెట్',
    price: 32000,
    originalPrice: 38000,
    category: 'menswear',
    images: [
      'https://images.unsplash.com/photo-1621570074981-ee6a0145c8b5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An aristocratic ivory achkan sherwani crafted from pure pashmina blended silk. Features handcrafted gold brass buttons, structured Mandarin collar, and includes a matching churidar pajama.',
    descriptionTe: 'స్వచ్ఛమైన పష్మినా పట్టుతో రూపొందించబడిన ఐవరీ షేర్వాణీ సెట్. వివాహ మరియు పండుగ వేడుకలకు అనువైనది.',
    rating: 4.7,
    reviewsCount: 15,
    tags: ['Menswear', 'Sherwani', 'Groom', 'Luxury', 'Silk'],
    variants: {
      sizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)']
    },
    fabricDetails: {
      gsm: 220,
      composition: 'Pashmina Silk Blend with Viscose Lining',
      weave: 'Structured Twill Weave',
      care: 'Dry Clean Only.'
    },
    stockStatus: 'ready_stock',
    inventory: 8,
    codAvailable: true,
    seoTitle: 'Ivory Pashmina Silk Sherwani Set | Deeprastore Menswear',
    seoMeta: 'Shop premium men\'s achkan sherwani sets in ivory pashmina silk. Elegant groomswear and luxury Indian festive menswear.',
    published: true
  },
  {
    id: 'prod-6',
    name: 'Anarkali Georgette Floral Gown with Dupatta',
    nameTe: 'అనార్కలి జార్జెట్ ఫ్లోరల్ గౌన్ (దుపట్టాతో)',
    price: 12500,
    originalPrice: 15900,
    category: 'kurta-sets',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A breathtakingly beautiful blooming floral georgette Anarkali gown with a 5-meter magnificent flair. Paired with a delicate organza dupatta featuring scalloped zari borders.',
    descriptionTe: '5 మీటర్ల అద్భుతమైన ఫ్లెయిర్ తో కూడిన జార్జెట్ ఫ్లోరల్ అనార్కలి గౌన్ మరియు ఆర్గన్జా దుపట్టా.',
    rating: 4.8,
    reviewsCount: 29,
    isTrending: true,
    tags: ['Anarkali', 'Georgette', 'Floral', 'Festive', 'Gown'],
    variants: {
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    fabricDetails: {
      gsm: 130,
      composition: 'Pure Faux Georgette with Butter Crepe Lining',
      weave: 'Flowy Georgette Weave',
      care: 'Hand Wash or Dry Clean.'
    },
    stockStatus: 'ready_stock',
    inventory: 15,
    codAvailable: true,
    seoTitle: 'Anarkali Georgette Floral Gown | Deeprastore Festive',
    seoMeta: 'Buy gorgeous Anarkali Georgette floral gowns online at Deeprastore. Featuring 5 meter flair and organza dupatta.',
    published: true
  },
  {
    id: 'prod-7',
    name: 'Pure Linen Zari Border Saree - Midnight Blue',
    nameTe: 'స్వచ్ఛమైన లినెన్ జరీ బార్డర్ చీర - మిడ్నైట్ బ్లూ',
    price: 6800,
    originalPrice: 8500,
    category: 'sarees',
    images: [
      'https://images.unsplash.com/photo-1607656311408-1e43fe4e50fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ultra-breathable organic linen saree in deep midnight blue, accented with a contemporary silver zari border. Perfect for elite workwear, high-tea parties, and sophisticated daily elegance.',
    descriptionTe: 'మిడ్నైట్ బ్లూ రంగులో ఉన్న సేంద్రీయ లినెన్ చీర, సిల్వర్ జరీ బార్డర్ తో. కార్యాలయ మరియు పార్టీ వేడ్కలకు అనుకూలం.',
    rating: 4.6,
    reviewsCount: 22,
    tags: ['Linen', 'Saree', 'Workwear', 'Organic', 'Minimalist'],
    variants: {
      colors: [
        { name: 'Midnight Blue', hex: '#191970' },
        { name: 'Earthy Olive', hex: '#556b2f' },
        { name: 'Lavender Mist', hex: '#e6e6fa' }
      ]
    },
    fabricDetails: {
      gsm: 95,
      composition: '100% Organic Bhagalpuri Linen',
      weave: 'Breathable Handloom Linen Weave',
      care: 'Gentle Hand Wash with Mild Detergent. Starch optionally.'
    },
    stockStatus: 'ready_stock',
    inventory: 20,
    codAvailable: true,
    seoTitle: 'Pure Linen Zari Border Saree | Deeprastore Workwear',
    seoMeta: 'Shop elegant organic linen sarees with silver zari borders. Breathable luxury sarees for work and daily wear.',
    published: true
  },
  {
    id: 'prod-8',
    name: 'Kalamkari Hand-Block Printed Cotton Silk Fabric',
    nameTe: 'కలంకారీ హ్యాండ్-బ్లాక్ ప్రింటెడ్ కాటన్ సిల్క్ ఫ్యాబ్రిక్',
    price: 550,
    originalPrice: 750,
    category: 'fabrics',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Authentic Pedana Kalamkari hand-block printed fabric using natural vegetable dyes. Rich earthy tones depicting traditional floral and peacock motifs. Excellent for kurtis, blouses, and statement jackets.',
    descriptionTe: 'సహజ కూరగాయల రంగులను ఉపయోగించి రూపొందించిన అసలైన పెడన కలంకారీ హ్యాండ్-బ్లాక్ ప్రింటెడ్ ఫ్యాబ్రిక్.',
    rating: 4.9,
    reviewsCount: 64,
    isBestSeller: true,
    tags: ['Kalamkari', 'Cotton Silk', 'Hand Block', 'Fabric', 'Eco-friendly'],
    variants: {
      meters: [1, 2, 3, 4, 5, 10]
    },
    fabricDetails: {
      gsm: 105,
      composition: '70% Pure Cotton, 30% Mulberry Silk',
      weave: 'Plain Weave with Natural Dye Block Print',
      care: 'First wash dry clean. Subsequent gentle cold wash.'
    },
    stockStatus: 'ready_stock',
    inventory: 400, // meters
    codAvailable: true,
    seoTitle: 'Kalamkari Hand Block Printed Fabric Online | Deeprastore',
    seoMeta: 'Buy authentic Kalamkari hand block printed cotton silk fabric per meter online. Crafted with natural vegetable dyes.',
    published: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8492',
    customerName: 'Lakshmi Chowdary',
    customerEmail: 'lakshmi.c@gmail.com',
    customerPhone: '+91 98490 12345',
    items: [
      {
        productId: 'prod-1',
        productName: 'Royal Crimson Kanjivaram Pure Silk Saree',
        price: 24500,
        quantity: 1,
        selectedColor: 'Crimson Red'
      }
    ],
    totalAmount: 24500,
    paymentMethod: 'PREPAID_RAZORPAY',
    paymentStatus: 'PAID',
    orderStatus: 'PROCESSING',
    shippingAddress: 'Flat 402, Jubilee Hills Residency, Road No 36, Hyderabad, Telangana',
    pincode: '500033',
    createdAt: '2026-05-12T10:30:00Z',
    whatsappNotified: true,
    telegramNotified: true
  },
  {
    id: 'ORD-8493',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@yahoo.com',
    customerPhone: '+91 91234 56789',
    items: [
      {
        productId: 'prod-4',
        productName: 'Bespoke Designer Blouse - Custom Stitching Service',
        price: 3499,
        quantity: 1,
        isCustomStitching: true,
        stitchingDetails: {
          bust: '34',
          waist: '28',
          armhole: '15',
          blouseLength: '14',
          notes: 'Deep U neck at the back with tassels. Elbow length sleeves.',
          referenceImageUploaded: true
        }
      },
      {
        productId: 'prod-3',
        productName: 'Premium Banarasi Chanderi Silk Fabric (Per Meter)',
        price: 850,
        quantity: 2,
        selectedMeters: 2,
        selectedColor: 'Rose Gold'
      }
    ],
    totalAmount: 5199,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    orderStatus: 'PENDING_CONFIRMATION',
    shippingAddress: '12/A, Green Meadows Villa, Sarjapur Road, Bengaluru, Karnataka',
    pincode: '560035',
    createdAt: '2026-05-14T14:15:00Z',
    whatsappNotified: true,
    telegramNotified: false
  },
  {
    id: 'ORD-8494',
    customerName: 'Vikram Raju',
    customerEmail: 'vikram.raju@techcorp.com',
    customerPhone: '+91 94400 55667',
    items: [
      {
        productId: 'prod-5',
        productName: 'Ivory Pashmina Silk Men\'s Achkan Sherwani Set',
        price: 32000,
        quantity: 1,
        selectedSize: '40 (L)'
      }
    ],
    totalAmount: 32000,
    paymentMethod: 'PREPAID_RAZORPAY',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    shippingAddress: 'Plot 88, VIP Colony, Visakhapatnam, Andhra Pradesh',
    pincode: '530003',
    createdAt: '2026-05-10T09:20:00Z',
    whatsappNotified: true,
    telegramNotified: true
  }
];

export const FESTIVAL_BANNERS = [
  {
    id: 'fest-1',
    title: 'Sravana Masam Mahotsav',
    titleTe: 'శ్రావణ మాస మహోత్సవం',
    subtitle: 'Up to 30% Off on Pure Kanjivaram & Banarasi Sarees',
    subtitleTe: 'కంచిపట్టు మరియు బనారసి చీరలపై 30% వరకు తగ్గింపు',
    code: 'SRAVANA30',
    bgGradient: 'from-amber-900 via-red-950 to-stone-900',
    textColor: 'text-amber-200'
  },
  {
    id: 'fest-2',
    title: 'Deeprastore Grand Wedding Edit',
    titleTe: 'దీప్రాస్టోర్ గ్రాండ్ వెడ్డింగ్ ఎడిట్',
    subtitle: 'Complimentary Custom Blouse Stitching on Orders Above ₹20,000',
    subtitleTe: '₹20,000 పైబడిన ఆర్డర్లకు ఉచిత కస్టమ్ బ్లౌజ్ స్టిచ్చింగ్',
    code: 'ROYALWEDDING',
    bgGradient: 'from-emerald-950 via-teal-900 to-stone-950',
    textColor: 'text-emerald-200'
  }
];

export const INSTAGRAM_FEED = [
  { id: 'ig-1', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', likes: '1.4k', handle: '@deeprastore.luxury' },
  { id: 'ig-2', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', likes: '2.8k', handle: '@deeprastore.luxury' },
  { id: 'ig-3', url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80', likes: '942', handle: '@deeprastore.luxury' },
  { id: 'ig-4', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', likes: '3.1k', handle: '@deeprastore.luxury' },
  { id: 'ig-5', url: 'https://images.unsplash.com/photo-1566560987971-5ab35a782b13?auto=format&fit=crop&w=600&q=80', likes: '1.9k', handle: '@deeprastore.luxury' },
  { id: 'ig-6', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', likes: '4.5k', handle: '@deeprastore.luxury' }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Sita Mahalakshmi',
    rating: 5,
    date: '2 days ago',
    comment: 'The Kanjivaram saree is absolutely breathtaking in person! The zari shines beautifully and the silk quality is authentic and rich. Customer support on WhatsApp helped me track my parcel instantly.',
    verifiedPurchase: true,
    productName: 'Royal Crimson Kanjivaram Pure Silk Saree'
  },
  {
    id: 'rev-2',
    customerName: 'Pooja Hegde',
    rating: 5,
    date: '1 week ago',
    comment: 'I ordered 5 meters of Banarasi Chanderi for my bridesmaid dress. The fabric was delivered in a continuous cut and the packaging felt like receiving a luxury gift box. Will order again!',
    verifiedPurchase: true,
    productName: 'Premium Banarasi Chanderi Silk Fabric'
  },
  {
    id: 'rev-3',
    customerName: 'Kavitha Reddy',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Tried their Custom Stitching service for a designer blouse. Uploaded my measurements online and it fits like a dream! No alterations required. Highly recommend Deeprastore tailoring.',
    verifiedPurchase: true,
    productName: 'Bespoke Designer Blouse - Custom Stitching Service'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Art of Kanjivaram: Identifying Authentic Gold Zari',
    titleTe: 'కంచిపట్టు కళ: అసలైన బంగారు జరీని ఎలా గుర్తించాలి',
    excerpt: 'Explore the centuries-old weaving traditions of Kanchipuram and learn how expert connoisseurs verify pure mulberry silk and 3G gold zari brocade.',
    content: 'Kanjivaram silk sarees are revered as the queen of silks. Originating from the temple town of Kanchipuram in Tamil Nadu, these sarees represent the pinnacle of Indian handloom artistry. In this comprehensive guide, we delve into the interlocking Korvai weaving technique, the distinction between pure zari and tested zari, and how Deeprastore guarantees 100% authentic silk mark certification for every bridal masterpiece.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    author: 'Deepra Fashion Editorial',
    date: 'May 10, 2026',
    readTime: '4 min read',
    category: 'Heritage & Craft'
  },
  {
    id: 'blog-2',
    title: 'Ultimate Guide to Fabric GSM and Choosing the Perfect Weave',
    titleTe: 'ఫ్యాబ్రిక్ GSM మరియు సరైన నేతను ఎంచుకోవడానికి గైడ్',
    excerpt: 'Understanding Grams per Square Meter (GSM) is essential when buying fabrics online for custom tailoring. Here is how to select the right drape.',
    content: 'When purchasing unstitched fabrics online, tactile feedback is replaced by technical specifications. Grams per Square Meter (GSM) indicates the weight and density of the fabric. For structured sherwanis and heavy lehengas, a higher GSM (200-300) like micro-velvet or raw silk is ideal. For flowy anarkalis and breathable summer sarees, lower GSM (80-120) like Chanderi silk or organic linen provides the perfect graceful fall.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80',
    author: 'Deepra Styling Team',
    date: 'April 28, 2026',
    readTime: '5 min read',
    category: 'Styling Tips'
  }
];

export const AI_PROMPT_TEMPLATES = {
  description: [
    "Generate a luxurious, poetic description for a premium Indian silk saree suitable for royal weddings, highlighting its handloom heritage and pure zari work.",
    "Write an enticing, modern product description for an organic linen summer saree, emphasizing breathability, minimalist elegance, and elite office wear.",
    "Create a compelling description for meter-based Banarasi brocade fabric, inspiring fashion designers to craft bespoke lehengas and royal jackets."
  ],
  seoMeta: [
    "Create a high-converting SEO meta description (under 160 characters) for a luxury bridal lehenga with heavy zardozi embroidery.",
    "Generate SEO keywords and title for pure Kalamkari cotton silk unstitched fabric online store."
  ],
  bannerText: [
    "Write a catchy festival sale headline and subtitle for Sravana Masam bridal wear collection with 30% discount.",
    "Create an urgent, premium call-to-action banner text for Deeprastore Grand Wedding Edit with complimentary custom tailoring."
  ],
  tags: [
    "Suggest 8 highly searched ecommerce product tags for a bespoke custom stitched designer blouse service.",
    "Suggest top trending fashion tags for men's ivory pashmina silk achkan sherwani."
  ]
};
