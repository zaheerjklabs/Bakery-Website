import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  Package,
  Clock,
  Sparkles,
  Users,
  CheckCircle2,
  Tag,
  Settings,
  ChevronLeft,
  Search,
  Filter,
} from 'lucide-react';
import { ACTIVE_COUPONS } from '../../data/bakeryData';

export const AdminPortal: React.FC = () => {
  const {
    products,
    orders,
    customCakeRequests,
    setCurrentView,
    currentUser,
    showToast,
  } = useBakery();

  const [activeTab, setActiveTab] = useState<'orders' | 'custom' | 'products' | 'coupons'>('orders');
  const [orderList, setOrderList] = useState(orders);

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    showToast({
      type: 'success',
      title: 'Status Updated',
      description: `Order #${orderId} marked as ${newStatus.replace('_', ' ')}`,
    });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#FEE2E8]">
        <div>
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777078] hover:text-[#E85D7D] mb-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
              Bakery Studio Management Portal
            </h1>
            <span className="bg-[#FFF0F2] text-[#E85D7D] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#FCD4DE]">
              Staff Active
            </span>
          </div>
          <p className="text-xs text-[#777078] mt-1">
            Manage live bake queues, bespoke wedding briefs, product inventory, and customer fulfillment.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[#FEE2E8] shadow-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#F27691] text-white shadow-xs'
                : 'text-[#777078] hover:text-[#242124]'
            }`}
          >
            Live Orders ({orderList.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'custom'
                ? 'bg-[#F27691] text-white shadow-xs'
                : 'text-[#777078] hover:text-[#242124]'
            }`}
          >
            Bespoke Briefs ({customCakeRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'products'
                ? 'bg-[#F27691] text-white shadow-xs'
                : 'text-[#777078] hover:text-[#242124]'
            }`}
          >
            Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'coupons'
                ? 'bg-[#F27691] text-white shadow-xs'
                : 'text-[#777078] hover:text-[#242124]'
            }`}
          >
            Coupons ({ACTIVE_COUPONS.length})
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#777078]">
            <span>Active Bakery Queue</span>
            <span>Real-time dispatch synchronization</span>
          </div>

          {orderList.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#FEE2E8]">
              <Package className="w-10 h-10 text-[#E85D7D] mx-auto mb-3 opacity-60" />
              <h3 className="font-serif text-lg font-bold text-[#242124]">
                No Orders Placed Yet
              </h3>
              <p className="text-xs text-[#777078] mt-1">
                When customers check out, their orders appear in this live baking queue.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orderList.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-5 border border-[#FEE2E8] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#242124]">
                        #{order.id}
                      </span>
                      <span className="text-xs text-[#777078]">·</span>
                      <span className="text-xs font-bold text-[#242124]">
                        {order.customer.fullName} ({order.customer.phone})
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        {order.paymentStatus}
                      </span>
                    </div>

                    <p className="text-xs text-[#777078]">
                      {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ')}
                    </p>

                    {order.customer.addressLine1 && (
                      <p className="text-[11px] text-[#A29BA3]">
                        Delivery to: {order.customer.addressLine1}, {order.customer.city}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="font-serif font-bold text-base text-[#E85D7D] tabular-nums">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#777078] block">
                        {order.paymentMethod.toUpperCase()}
                      </span>
                    </div>

                    {/* Status updater dropdown */}
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="px-3 py-2 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs font-semibold text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                    >
                      <option value="received">Received</option>
                      <option value="baking">Baking in Oven</option>
                      <option value="decorating">Artisan Decorating</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered Fresh</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Cake Requests Tab */}
      {activeTab === 'custom' && (
        <div className="space-y-4">
          {customCakeRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#FEE2E8]">
              <Sparkles className="w-10 h-10 text-[#E9B65D] mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#242124]">
                No Custom Cake Requests Yet
              </h3>
              <p className="text-xs text-[#777078] mt-1">
                Submissions from the &quot;Bespoke Custom Orders&quot; form will show here with contact details and theme notes.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {customCakeRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-5 border border-[#FEE2E8] shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#E85D7D]">
                        {req.id}
                      </span>
                      <span className="font-bold text-sm text-[#242124] ml-2">
                        {req.fullName}
                      </span>
                      <span className="text-xs text-[#777078] ml-2">
                        ({req.phone} · {req.email})
                      </span>
                    </div>
                    <span className="bg-[#FFF0F2] text-[#E85D7D] px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      Target: {req.budgetRange}
                    </span>
                  </div>

                  <div className="text-xs text-[#777078] grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#FFF9F5] p-3 rounded-xl border border-[#FEE2E8]">
                    <div>Occasion: <strong>{req.occasion}</strong></div>
                    <div>Guests: <strong>{req.guestCount}</strong></div>
                    <div>Tiers: <strong>{req.tiers}</strong></div>
                    <div>Event Date: <strong>{req.deliveryDate}</strong></div>
                  </div>

                  {req.themeDescription && (
                    <p className="text-xs text-[#242124] bg-white p-2.5 rounded-xl border border-[#FEE2E8]">
                      <strong>Design Notes:</strong> &ldquo;{req.themeDescription}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Catalog Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl p-6 border border-[#FEE2E8] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#FEE2E8] text-[#777078] uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Cake Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Base Price</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FFF0F2]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FFF9F5]">
                    <td className="py-3 px-4 font-bold text-[#242124]">{p.name}</td>
                    <td className="py-3 px-4 capitalize">{p.category}</td>
                    <td className="py-3 px-4 font-serif font-bold text-[#E85D7D] tabular-nums">
                      ₹{p.basePrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 tabular-nums">★ {p.rating} ({p.reviewCount})</td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                        Active In Stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ACTIVE_COUPONS.map((coupon) => (
            <div
              key={coupon.code}
              className="p-5 bg-white rounded-2xl border border-[#FEE2E8] shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-[#E85D7D]">
                  {coupon.code}
                </span>
                <span className="bg-[#FFF0F2] text-[#E85D7D] px-2 py-0.5 rounded-full text-xs font-bold">
                  {coupon.discountPercentage > 0 ? `${coupon.discountPercentage}% OFF` : 'FREE DEL'}
                </span>
              </div>
              <p className="text-xs text-[#777078]">{coupon.description}</p>
              <div className="text-[11px] text-[#A29BA3] pt-2 border-t border-[#FFF0F2]">
                Min Order: ₹{coupon.minOrder.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
