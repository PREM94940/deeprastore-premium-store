import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Smartphone, 
  Key, 
  Package, 
  Heart, 
  MapPin, 
  Eye, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ExternalLink
} from 'lucide-react';

export const CustomerAccount: React.FC = () => {
  const { 
    user, 
    loginWithOtp, 
    logout, 
    orders, 
    wishlist, 
    products, 
    setSelectedProductId, 
    setCurrentView,
    language, 
    showToast 
  } = useApp();

  const [phoneInput, setPhoneInput] = useState('+91 98490 12345');
  const [otpInput, setOtpInput] = useState('1234');
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'recent'>('orders');

  const [addresses, setAddresses] = useState([
    { id: 'addr-1', label: 'Home', address: 'Flat 402, Jubilee Hills Residency, Road No 36, Hyderabad, Telangana - 500033', isDefault: true },
    { id: 'addr-2', label: 'Office', address: 'Deepra Fashion Tower, 4th Floor, Madhapur, Hyderabad, Telangana - 500081', isDefault: false }
  ]);

  const [newAddrText, setNewAddrText] = useState('');
  const [showAddAddr, setShowAddAddr] = useState(false);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const recentProducts = products.slice(0, 4);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithOtp(phoneInput, otpInput);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddrText.trim()) {
      setAddresses([...addresses, { id: `addr-${Date.now()}`, label: 'Other', address: newAddrText, isDefault: false }]);
      setNewAddrText('');
      setShowAddAddr(false);
      showToast('New shipping address saved successfully!');
    }
  };

  const myOrders = orders.filter(o => o.customerPhone === user?.phone || o.customerName === user?.name);

  if (!user?.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-stone-200 text-center space-y-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-800">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-950">
              {language === 'te' ? 'ఖాతాకు లాగిన్ చేయండి' : 'Patron Account Login'}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'te' ? 'మీ మొబైల్ నంబర్ మరియు OTP (1234) నమోదు చేయండి' : 'Enter your mobile number to receive a secure OTP'}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Mobile Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  value={phoneInput} 
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Secure OTP (Use 1234)</label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  value={otpInput} 
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700 tracking-widest" 
                  required 
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-950 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl transition-all"
            >
              {language === 'te' ? 'లాగిన్ చేయండి' : 'VERIFY OTP & LOGIN'}
            </button>
          </form>

          <p className="text-[11px] text-stone-400">
            By logging in, you agree to Deeprastore Terms of Service & Privacy Policy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in pb-32">
      
      {/* Account Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 bg-amber-500 text-stone-950 rounded-full flex items-center justify-center font-serif font-bold text-3xl shadow-lg shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">{user.name}</h1>
            <p className="text-stone-300 text-xs sm:text-sm font-medium flex items-center gap-3 justify-center sm:justify-start">
              <span>📱 {user.phone}</span>
              <span className="text-stone-500">|</span>
              <span>✉️ {user.email}</span>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-stone-800 hover:bg-red-950/80 text-stone-200 hover:text-red-300 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-stone-700 transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>{language === 'te' ? 'లాగౌట్' : 'LOGOUT'}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 mb-8 overflow-x-auto gap-4 sm:gap-8">
        {[
          { id: 'orders', label: language === 'te' ? 'నా ఆర్డర్లు' : 'My Order Tracking', icon: Package, count: myOrders.length },
          { id: 'wishlist', label: language === 'te' ? 'విష్‌లిస్ట్' : 'Saved Wishlist', icon: Heart, count: wishlist.length },
          { id: 'addresses', label: language === 'te' ? 'చిరునామాలు' : 'Saved Addresses', icon: MapPin, count: addresses.length },
          { id: 'recent', label: language === 'te' ? 'ఇటీవల చూసినవి' : 'Recently Viewed', icon: Eye, count: recentProducts.length },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-stone-900 text-stone-950 font-black' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded-full text-[10px]">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            {myOrders.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 shadow-sm">
                <Package className="w-16 h-16 text-stone-300 mx-auto mb-4 stroke-1" />
                <p className="font-serif font-bold text-lg text-stone-900 mb-1">No Orders Found</p>
                <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">You haven't placed any premium orders yet. Explore our pure silks curation today.</p>
                <button onClick={() => setCurrentView('storefront')} className="bg-amber-800 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Explore Collections
                </button>
              </div>
            ) : (
              myOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="p-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-stone-950 text-base">{order.id}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-950' :
                          order.orderStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-950' :
                          order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-950' : 'bg-amber-100 text-amber-950'
                        }`}>
                          {order.orderStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-stone-500 block">Total Amount</span>
                        <span className="font-serif font-bold text-stone-950 text-base">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="pl-4 border-l border-stone-300">
                        <span className="text-stone-500 block">Payment Method</span>
                        <span className="font-semibold text-stone-800">{order.paymentMethod === 'COD' ? '💵 Cash on Delivery' : '💳 Prepaid (Razorpay)'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="divide-y divide-stone-100 space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className={`${idx > 0 ? 'pt-4' : ''} flex items-center justify-between gap-4`}>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center font-bold text-stone-700 shrink-0">
                              {item.quantity}x
                            </div>
                            <div>
                              <p className="text-xs font-bold text-stone-900">{item.productName}</p>
                              <div className="text-[11px] text-stone-500 flex gap-3 mt-0.5">
                                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                                {item.selectedMeters && <span>Cut: {item.selectedMeters} Meters</span>}
                                {item.isCustomStitching && <span className="text-amber-800 font-semibold">✂️ Custom Stitched</span>}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-serif font-bold text-stone-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-2 text-stone-600">
                        <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                        <span className="truncate max-w-md"><strong>Shipping:</strong> {order.shippingAddress} (Pin: {order.pincode})</span>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <button 
                          onClick={() => window.open(`https://wa.me/919849012345?text=Tracking%20inquiry%20for%20order%20${order.id}`, '_blank')}
                          className="w-full sm:w-auto bg-emerald-50 hover:bg-emerald-100 text-emerald-950 px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>Track on WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6 animate-fade-in">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 shadow-sm">
                <Heart className="w-16 h-16 text-stone-300 mx-auto mb-4 stroke-1" />
                <p className="font-serif font-bold text-lg text-stone-900 mb-1">Your Wishlist is Empty</p>
                <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto">Save your favorite Kanjivaram sarees and bespoke pieces to view them later.</p>
                <button onClick={() => setCurrentView('storefront')} className="bg-amber-800 text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Explore Collections
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((rel) => (
                  <div key={rel.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200 flex flex-col">
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                      <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setSelectedProductId(rel.id); setCurrentView('product-detail'); }}
                          className="w-full bg-stone-900 text-white py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <p className="font-serif font-bold text-stone-900 text-sm line-clamp-2">{rel.name}</p>
                      <p className="font-serif font-bold text-amber-800 text-base">₹{rel.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-6 animate-fade-in max-w-3xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-stone-900">Saved Shipping Addresses</h3>
              <button 
                onClick={() => setShowAddAddr(!showAddAddr)}
                className="bg-stone-900 hover:bg-stone-950 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                {showAddAddr ? 'Cancel' : '+ Add New Address'}
              </button>
            </div>

            {showAddAddr && (
              <form onSubmit={handleAddAddress} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4 animate-fade-in">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Enter Complete Address & Pincode</h4>
                <textarea 
                  rows={3} 
                  value={newAddrText} 
                  onChange={(e) => setNewAddrText(e.target.value)} 
                  placeholder="E.g. House No 42, Road No 10, Banjara Hills, Hyderabad, Telangana - 500034"
                  className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  required 
                />
                <button type="submit" className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md">
                  Save Address
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="bg-stone-100 text-stone-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">{addr.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Tab */}
        {activeTab === 'recent' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">Recently Viewed Masterpieces</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.map((rel) => (
                <div key={rel.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-200 flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setSelectedProductId(rel.id); setCurrentView('product-detail'); }}
                        className="w-full bg-stone-900 text-white py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <p className="font-serif font-bold text-stone-900 text-sm line-clamp-2">{rel.name}</p>
                    <p className="font-serif font-bold text-amber-800 text-base">₹{rel.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
