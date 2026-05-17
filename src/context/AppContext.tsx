import React, { createContext, useContext, useState } from 'react';
import { 
  Product, 
  Order, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS 
} from '../data/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedMeters?: number;
  isCustomStitching?: boolean;
  stitchingDetails?: any;
}

export interface LiveEditorSection {
  id: string;
  type: 'hero' | 'video' | 'trending' | 'categories' | 'festival' | 'reviews' | 'instagram' | 'reels';
  title: string;
  titleTe: string;
  visible: boolean;
  order: number;
}

interface AppContextType {
  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;

  // Products & Admin State
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  bulkUploadProducts: (newProducts: Product[]) => void;

  // Orders State
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountAmount: number;
  applyCoupon: (code: string) => boolean;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // User Account
  user: { name: string; phone: string; email: string; isLoggedIn: boolean } | null;
  loginWithOtp: (phone: string, otp: string) => boolean;
  logout: () => void;

  // Live Editor State
  editorSections: LiveEditorSection[];
  setEditorSections: React.Dispatch<React.SetStateAction<LiveEditorSection[]>>;
  updateSectionOrder: (startIndex: number, endIndex: number) => void;
  toggleSectionVisibility: (id: string) => void;

  // Special Features
  pincode: string;
  setPincode: (pin: string) => void;
  checkPincodeDelivery: (pin: string) => { available: boolean; cod: boolean; days: number };
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('storefront');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [language, setLanguage] = useState<'en' | 'te'>('en');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);
  const [user, setUser] = useState<{ name: string; phone: string; email: string; isLoggedIn: boolean } | null>({
    name: 'Lakshmi Chowdary',
    phone: '+91 98490 12345',
    email: 'lakshmi.c@gmail.com',
    isLoggedIn: true
  });

  const [pincode, setPincode] = useState<string>('500033');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [editorSections, setEditorSections] = useState<LiveEditorSection[]>([
    { id: 'hero', type: 'hero', title: 'Cinematic Hero Banner', titleTe: 'సినిమాటిక్ హీరో బ్యానర్', visible: true, order: 1 },
    { id: 'trending', type: 'trending', title: 'Trending Luxury Collections', titleTe: 'ట్రెండింగ్ లగ్జరీ కలెక్షన్స్', visible: true, order: 2 },
    { id: 'festival', type: 'festival', title: 'Festival Offers Banner', titleTe: 'పండుగ ఆఫర్ల బ్యానర్', visible: true, order: 3 },
    { id: 'categories', type: 'categories', title: 'Shop by Category', titleTe: 'కేటగిరీ ద్వారా షాపింగ్ చేయండి', visible: true, order: 4 },
    { id: 'video', type: 'video', title: 'Cinematic Brand Video', titleTe: 'సినిమాటిక్ బ్రాండ్ వీడియో', visible: true, order: 5 },
    { id: 'reels', type: 'reels', title: 'Instagram Reels Inspired Showcase', titleTe: 'ఇన్‌స్టాగ్రామ్ రీల్స్ షోకేస్', visible: true, order: 6 },
    { id: 'reviews', type: 'reviews', title: 'Verified Customer Reviews', titleTe: 'ధృవీకరించబడిన కస్టమర్ సమీక్షలు', visible: true, order: 7 },
    { id: 'instagram', type: 'instagram', title: 'Deeprastore Instagram Feed', titleTe: 'దీప్రాస్టోర్ ఇన్‌స్టాగ్రామ్ ఫీడ్', visible: true, order: 8 },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Product actions
  const addProduct = (prod: Product) => {
    setProducts([prod, ...products]);
    showToast(`Product "${prod.name}" added successfully!`);
  };

  const updateProduct = (updated: Product) => {
    setProducts(products.map(p => p.id === updated.id ? updated : p));
    showToast(`Product "${updated.name}" updated successfully!`);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Product deleted successfully.');
  };

  const bulkUploadProducts = (newProducts: Product[]) => {
    setProducts([...newProducts, ...products]);
    showToast(`${newProducts.length} products bulk uploaded successfully!`);
  };

  // Order actions
  const createOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName || user?.name || 'Guest Customer',
      customerEmail: orderData.customerEmail || user?.email || 'guest@deeprastore.com',
      customerPhone: orderData.customerPhone || user?.phone || '+91 99999 00000',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      paymentMethod: orderData.paymentMethod || 'COD',
      paymentStatus: orderData.paymentStatus || 'PENDING',
      orderStatus: 'PENDING_CONFIRMATION',
      shippingAddress: orderData.shippingAddress || 'Deeprastore Shipping Address',
      pincode: orderData.pincode || pincode,
      createdAt: new Date().toISOString(),
      whatsappNotified: true,
      telegramNotified: true
    };

    setOrders([newOrder, ...orders]);
    showToast(`Order ${newOrder.id} placed successfully! WhatsApp confirmation sent.`);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
    showToast(`Order ${orderId} status updated to ${status}. WhatsApp notification triggered.`);
  };

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, paymentStatus: status } : o));
    showToast(`Order ${orderId} payment status updated to ${status}.`);
  };

  // Cart actions
  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
    showToast(`Added ${item.product.name} to your cart.`);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountAmount(0);
  };

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'SRAVANA30') {
      setCouponCode(upper);
      setDiscountAmount(0.3);
      showToast('SRAVANA30 applied! 30% discount added.');
      return true;
    } else if (upper === 'ROYALWEDDING') {
      setCouponCode(upper);
      setDiscountAmount(0.2);
      showToast('ROYALWEDDING applied! 20% discount added.');
      return true;
    } else if (upper === 'DEEPRA10') {
      setCouponCode(upper);
      setDiscountAmount(0.1);
      showToast('DEEPRA10 applied! 10% discount added.');
      return true;
    } else {
      showToast('Invalid coupon code.');
      return false;
    }
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from wishlist.');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Added to wishlist.');
    }
  };

  // User actions
  const loginWithOtp = (phone: string, otp: string) => {
    if (otp === '1234' || otp.length === 4) {
      setUser({
        name: 'Lakshmi Chowdary',
        phone: phone,
        email: 'lakshmi.c@gmail.com',
        isLoggedIn: true
      });
      showToast('Successfully logged in with OTP!');
      return true;
    }
    showToast('Invalid OTP. Please enter 1234.');
    return false;
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully.');
  };

  // Live Editor actions
  const updateSectionOrder = (startIndex: number, endIndex: number) => {
    const result = Array.from(editorSections);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    // update order property
    const reordered = result.map((sec, index) => ({ ...sec, order: index + 1 }));
    setEditorSections(reordered);
    showToast('Homepage sections reordered successfully!');
  };

  const toggleSectionVisibility = (id: string) => {
    setEditorSections(editorSections.map(sec => sec.id === id ? { ...sec, visible: !sec.visible } : sec));
    showToast('Section visibility updated.');
  };

  // Pincode checker
  const checkPincodeDelivery = (pin: string) => {
    setPincode(pin);
    if (pin.startsWith('50') || pin.startsWith('53') || pin.startsWith('56') || pin.startsWith('60') || pin.startsWith('11') || pin.startsWith('40')) {
      return { available: true, cod: true, days: 3 };
    } else if (pin.length === 6) {
      return { available: true, cod: false, days: 6 };
    } else {
      return { available: false, cod: false, days: 0 };
    }
  };

  return (
    <AppContext.Provider value={{
      currentView, setCurrentView,
      selectedProductId, setSelectedProductId,
      selectedCategory, setSelectedCategory,
      language, setLanguage,
      products, setProducts, addProduct, updateProduct, deleteProduct, bulkUploadProducts,
      orders, setOrders, createOrder, updateOrderStatus, updatePaymentStatus,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      isCartOpen, setIsCartOpen,
      couponCode, setCouponCode, discountAmount, applyCoupon,
      wishlist, toggleWishlist,
      user, loginWithOtp, logout,
      editorSections, setEditorSections, updateSectionOrder, toggleSectionVisibility,
      pincode, setPincode, checkPincodeDelivery,
      toastMessage, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
