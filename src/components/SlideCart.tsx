import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Smartphone, 
  MapPin, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SlideCart: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    couponCode, 
    discountAmount, 
    applyCoupon,
    createOrder,
    user,
    pincode,
    checkPincodeDelivery,
    language
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [shippingPin, setShippingPin] = useState(pincode);
  const [pinResult, setPinResult] = useState<{ available: boolean; cod: boolean; days: number } | null>(null);

  // Checkout modal simulation state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID_RAZORPAY' | 'COD'>('PREPAID_RAZORPAY');
  const [address, setAddress] = useState('Flat 402, Jubilee Hills Residency, Road No 36, Hyderabad, Telangana');
  const [phone, setPhone] = useState(user?.phone || '+91 98490 12345');
  const [razorpaySuccess, setRazorpaySuccess] = useState(false);
  const [abandonedPrompt, setAbandonedPrompt] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.selectedMeters) {
      itemPrice = item.product.price * item.selectedMeters;
    }
    return acc + (itemPrice * item.quantity);
  }, 0);

  const discount = subtotal * discountAmount;
  const shippingFee = subtotal > 15000 ? 0 : 250;
  const grandTotal = subtotal - discount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon(inputCoupon);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkPincodeDelivery(shippingPin);
    setPinResult(res);
  };

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckoutOpen(true);
  };

  const handleSimulateRazorpay = () => {
    setRazorpaySuccess(true);
    setTimeout(() => {
      createOrder({
        customerName: user?.name || 'Luxury Patron',
        customerPhone: phone,
        shippingAddress: address,
        pincode: shippingPin,
        totalAmount: grandTotal,
        paymentMethod: 'PREPAID_RAZORPAY',
        paymentStatus: 'PAID',
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          selectedMeters: item.selectedMeters,
          isCustomStitching: item.isCustomStitching,
          stitchingDetails: item.stitchingDetails
        }))
      });
      setIsCheckoutOpen(false);
      setRazorpaySuccess(false);
      setIsCartOpen(false);
    }, 2500);
  };

  const handleSimulateCOD = () => {
    createOrder({
      customerName: user?.name || 'Luxury Patron',
      customerPhone: phone,
      shippingAddress: address,
      pincode: shippingPin,
      totalAmount: grandTotal,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        selectedMeters: item.selectedMeters,
        isCustomStitching: item.isCustomStitching,
        stitchingDetails: item.stitchingDetails
      }))
    });
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleCloseCart = () => {
    if (cart.length > 0 && !abandonedPrompt) {
      setAbandonedPrompt(true);
    } else {
      setIsCartOpen(false);
      setAbandonedPrompt(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Slide Cart Drawer */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-serif font-bold tracking-wide">
              {language === 'te' ? 'షాపింగ్ కార్ట్' : 'Your Shopping Bag'} ({cart.length})
            </h2>
          </div>
          <button 
            onClick={handleCloseCart}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Abandoned Cart Recovery Prompt */}
        {abandonedPrompt && cart.length > 0 && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 animate-fade-in flex items-start gap-3 text-amber-950">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-amber-900 mb-1">
                {language === 'te' ? 'ఆగండి! మీ కార్ట్‌ను వదిలివెళ్లకండి.' : 'Wait! Don\'t leave your premium silks behind.'}
              </p>
              <p className="text-stone-700 mb-2">
                {language === 'te' ? 'కూపన్ DEEPRA10 ఉపయోగించి అదనంగా 10% తగ్గింపు పొందండి!' : 'Use code DEEPRA10 for an extra 10% off your order instantly.'}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => { applyCoupon('DEEPRA10'); setAbandonedPrompt(false); }}
                  className="bg-amber-800 text-white px-3 py-1 rounded font-bold text-[11px] hover:bg-amber-900"
                >
                  {language === 'te' ? 'కూపన్ వర్తింపజేయండి' : 'Apply DEEPRA10'}
                </button>
                <button 
                  onClick={() => { setIsCartOpen(false); setAbandonedPrompt(false); }}
                  className="text-stone-500 hover:text-stone-800 underline text-[11px]"
                >
                  {language === 'te' ? 'వదిలివేయండి' : 'Leave anyway'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4 stroke-1" />
              <p className="text-stone-800 font-serif text-lg font-semibold mb-2">
                {language === 'te' ? 'మీ కార్ట్ ఖాళీగా ఉంది' : 'Your bag is empty'}
              </p>
              <p className="text-stone-500 text-xs mb-6 max-w-xs mx-auto">
                {language === 'te' ? 'మా ప్రీమియం కంచిపట్టు మరియు బనారసి కలెక్షన్లను అన్వేషించండి.' : 'Discover our exquisite handloom Kanjivaram sarees and bespoke tailoring.'}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all shadow-md"
              >
                {language === 'te' ? 'షాపింగ్ ప్రారంభించండి' : 'EXPLORE COLLECTIONS'}
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              let itemPrice = item.product.price;
              if (item.selectedMeters) {
                itemPrice = item.product.price * item.selectedMeters;
              }
              return (
                <div key={index} className={`${index > 0 ? 'pt-6' : ''} flex gap-4 items-start`}>
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-20 h-24 object-cover rounded-xl border border-stone-200 shadow-sm shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-stone-900 truncate">
                      {language === 'te' ? item.product.nameTe : item.product.name}
                    </h3>
                    <p className="text-xs font-serif font-bold text-amber-800 mt-1">
                      ₹{itemPrice.toLocaleString('en-IN')}
                    </p>

                    {/* Variant details */}
                    <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                      {item.selectedSize && <p>Size: <span className="font-medium text-stone-800">{item.selectedSize}</span></p>}
                      {item.selectedColor && <p>Color: <span className="font-medium text-stone-800">{item.selectedColor}</span></p>}
                      {item.selectedMeters && <p>Cut: <span className="font-medium text-stone-800">{item.selectedMeters} Meters</span></p>}
                      {item.isCustomStitching && (
                        <span className="inline-block bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.5 rounded font-semibold mt-1">
                          ✂️ Custom Tailored
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                        <button 
                          onClick={() => updateCartQuantity(index, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-200 font-bold text-xs transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold text-stone-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(index, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-200 font-bold text-xs transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary Section */}
        {cart.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-4">
            
            {/* Pincode Shipping Calculator */}
            <form onSubmit={handleCheckPincode} className="flex gap-2 items-center">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  placeholder={language === 'te' ? 'పిన్‌కోడ్ నమోదు చేయండి...' : 'Check Pincode delivery...'} 
                  value={shippingPin}
                  onChange={(e) => setShippingPin(e.target.value)}
                  className="w-full bg-white text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                />
              </div>
              <button type="submit" className="bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-stone-900 transition-colors">
                {language === 'te' ? 'తనిఖీ' : 'Check'}
              </button>
            </form>
            {pinResult && (
              <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${pinResult.available ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'}`}>
                {pinResult.available ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Estimated delivery in <strong>{pinResult.days} days</strong>. {pinResult.cod ? 'COD Available.' : 'Prepaid Only.'}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Delivery currently unavailable to this pincode.</span>
                  </>
                )}
              </div>
            )}

            {/* Coupon System */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  placeholder={language === 'te' ? 'కూపన్ కోడ్ (SRAVANA30)...' : 'Coupon code (e.g. SRAVANA30)'} 
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full bg-white text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700/50 uppercase"
                />
              </div>
              <button type="submit" className="bg-amber-800 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors">
                {language === 'te' ? 'వర్తించు' : 'Apply'}
              </button>
            </form>
            {couponCode && (
              <div className="flex items-center justify-between text-xs bg-amber-100 text-amber-950 px-3 py-1.5 rounded-lg font-medium">
                <span>Coupon applied: <strong>{couponCode}</strong> ({discountAmount * 100}% off)</span>
                <button onClick={() => applyCoupon('')} className="text-amber-800 hover:text-amber-950 font-bold">Remove</button>
              </div>
            )}

            {/* Summary Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>{language === 'te' ? 'ఉపమొత్తం' : 'Subtotal'}</span>
                <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-amber-800">
                  <span>{language === 'te' ? 'తగింపు' : 'Discount'} ({couponCode})</span>
                  <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{language === 'te' ? 'షిప్పింగ్' : 'Shipping'}</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-600 uppercase font-bold">Free</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>{language === 'te' ? 'మొత్తం' : 'Grand Total'}</span>
                <span className="text-amber-900 text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleStartCheckout}
              className="w-full bg-stone-900 hover:bg-stone-950 text-white py-3.5 rounded-xl font-semibold tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>{language === 'te' ? 'చెక్అవుట్ కొనసాగించండి' : 'PROCEED TO CHECKOUT'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secure Badges */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Secure</span>
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-amber-700" /> Free Shipping &gt; ₹15K</span>
            </div>

          </div>
        )}
      </div>

      {/* Razorpay / Checkout Simulation Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                {language === 'te' ? 'సురక్షిత చెల్లింపు' : 'Secure Premium Checkout'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Deeprastore x Razorpay Gateway Integration
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'te' ? 'షిప్పింగ్ చిరునామా (ఆటోఫిల్)' : 'Shipping Address (Autofill)'}
                </label>
                <textarea 
                  rows={2}
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'te' ? 'మొబైల్ నంబర్ (వాట్సాప్ అప్‌డేట్‌ల కోసం)' : 'Mobile Number (For WhatsApp Updates)'}
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  {language === 'te' ? 'చెల్లింపు పద్ధతిని ఎంచుకోండి' : 'Select Payment Method'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PREPAID_RAZORPAY')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'PREPAID_RAZORPAY' 
                        ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-sm' 
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>💳 Razorpay / UPI</span>
                    <span className="text-[10px] text-emerald-600 font-normal">Instant 2% Extra Off</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'COD' 
                        ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-sm' 
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>💵 Cash on Delivery</span>
                    <span className="text-[10px] text-stone-500 font-normal">OTP verification required</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-sm font-semibold">
                <span className="text-stone-700">{language === 'te' ? 'చెల్లించవలసిన మొత్తం' : 'Amount Payable'}:</span>
                <span className="text-amber-900 font-serif text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {paymentMethod === 'PREPAID_RAZORPAY' ? (
              <button
                onClick={handleSimulateRazorpay}
                disabled={razorpaySuccess}
                className="w-full bg-amber-800 hover:bg-amber-900 text-white py-3.5 rounded-xl font-semibold text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 disabled:bg-stone-400"
              >
                {razorpaySuccess ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing via Razorpay...</span>
                  </>
                ) : (
                  <span>PAY ₹{grandTotal.toLocaleString('en-IN')} WITH RAZORPAY</span>
                )}
              </button>
            ) : (
              <button
                onClick={handleSimulateCOD}
                className="w-full bg-stone-900 hover:bg-stone-950 text-white py-3.5 rounded-xl font-semibold text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>CONFIRM CASH ON DELIVERY (COD)</span>
              </button>
            )}

            <p className="text-[10px] text-stone-400 text-center mt-4">
              By confirming, you authorize Deeprastore to send automated order status updates on WhatsApp.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
