import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../data/mockData';
import { 
  Search, 
  MessageSquare, 
  Printer, 
  CheckCircle2, 
  X, 
  Plus 
} from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus, updatePaymentStatus, createOrder, products, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Manual order creation modal
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualCustomer, setManualCustomer] = useState('Anand Varma');
  const [manualPhone, setManualPhone] = useState('+91 94400 11223');
  const [manualAddress, setManualAddress] = useState('Plot 12, VIP Hills, Madhapur, Hyderabad');
  const [manualProduct, setManualProduct] = useState(products[0].id);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerPhone.includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || o.orderStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleManualOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === manualProduct) || products[0];

    createOrder({
      customerName: manualCustomer,
      customerPhone: manualPhone,
      shippingAddress: manualAddress,
      pincode: '500081',
      totalAmount: prod.price,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          price: prod.price,
          quantity: 1,
          selectedColor: prod.variants.colors?.[0]?.name
        }
      ]
    });

    setShowManualModal(false);
  };

  const handleSimulatePrintInvoice = (orderId: string) => {
    window.print();
    showToast(`Invoice for ${orderId} generated successfully.`);
  };

  const handleSimulateWhatsAppUpdate = (order: Order) => {
    window.open(`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20your%20Deeprastore%20order%20${order.id}%20status%20is%20now%20${order.orderStatus}.`, '_blank');
    showToast(`WhatsApp status update dispatched for order ${order.id}.`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Order Toolbar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search order ID, customer, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            <option value="all">All Statuses</option>
            <option value="PENDING_CONFIRMATION">Pending Confirmation (COD)</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <button
          onClick={() => setShowManualModal(true)}
          className="bg-stone-900 hover:bg-stone-950 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Order Creation</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-900 text-white uppercase tracking-wider font-semibold border-b border-stone-800">
                <th className="p-4 pl-6">Order ID / Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Items / Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 pl-6">
                    <p className="font-serif font-bold text-stone-950 text-sm">{order.id}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-stone-900">{order.customerName}</p>
                    <p className="text-[11px] text-stone-500">{order.customerPhone}</p>
                    <p className="text-[10px] text-stone-400 truncate max-w-xs">{order.shippingAddress}</p>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {order.items.map((it, i) => (
                        <p key={i} className="text-stone-800 font-medium truncate max-w-xs">
                          {it.quantity}x {it.productName}
                        </p>
                      ))}
                      <p className="font-serif font-bold text-stone-950 text-sm pt-1 border-t border-stone-100">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 space-y-1">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-widest ${order.paymentMethod === 'COD' ? 'bg-amber-100 text-amber-950' : 'bg-blue-100 text-blue-950'}`}>
                      {order.paymentMethod}
                    </span>
                    <div>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updatePaymentStatus(order.id, e.target.value as any)}
                        className="mt-1 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-[10px] font-bold text-stone-800"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="REFUNDED">Refunded</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-4 space-y-1">
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest ${
                      order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-950' :
                      order.orderStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-950' :
                      order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-950' : 'bg-amber-100 text-amber-950'
                    }`}>
                      {order.orderStatus.replace('_', ' ')}
                    </span>
                    <div>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="mt-1 bg-stone-100 border border-stone-300 rounded px-2 py-1 text-[10px] font-bold text-stone-800"
                      >
                        <option value="PENDING_CONFIRMATION">Pending Confirmation</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2 whitespace-nowrap">
                    {order.orderStatus === 'PENDING_CONFIRMATION' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors"
                        title="Confirm COD Order"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleSimulateWhatsAppUpdate(order)}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors"
                      title="Send WhatsApp Update"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSimulatePrintInvoice(order.id)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                      title="Cancel Order"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Order Creation Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-stone-200 my-8">
            <button 
              onClick={() => setShowManualModal(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-stone-950">Manual Order Creation</h2>
              <p className="text-xs text-stone-500 mt-1">Shopify Admin Direct Order Entry</p>
            </div>

            <form onSubmit={handleManualOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Customer Full Name</label>
                <input 
                  type="text" 
                  value={manualCustomer} 
                  onChange={(e) => setManualCustomer(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Customer Phone Number</label>
                <input 
                  type="text" 
                  value={manualPhone} 
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Complete Shipping Address</label>
                <textarea 
                  rows={2} 
                  value={manualAddress} 
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">Select Masterpiece Product</label>
                <select 
                  value={manualProduct} 
                  onChange={(e) => setManualProduct(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-950 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                >
                  Create Order & Dispatch WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
