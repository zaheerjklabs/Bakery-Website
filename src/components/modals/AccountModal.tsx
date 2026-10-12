import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { User, X, CheckCircle2, Package, LogOut, Shield, Mail } from 'lucide-react';

export const AccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    currentUser,
    loginUser,
    logoutUser,
    orders,
    setCurrentView,
  } = useBakery();

  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  if (!isAccountModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    loginUser(emailInput, nameInput);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAccountModalOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#FEE2E8] animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-[#FFF0F2] mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#242124]">
                {currentUser ? 'My Bakery Account' : 'Welcome to CakeLuv'}
              </h3>
            </div>
            <button
              onClick={() => setIsAccountModalOpen(false)}
              className="p-1.5 text-[#777078] hover:text-[#242124] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {currentUser ? (
            <div className="space-y-6">
              <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#FEE2E8]">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-[#242124]">{currentUser.name}</h4>
                  {currentUser.isAdmin && (
                    <span className="bg-[#FFF0F2] text-[#E85D7D] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#FCD4DE]">
                      Admin Staff
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#777078]">{currentUser.email}</p>
                <p className="text-xs text-[#777078] mt-0.5">{currentUser.phone}</p>
              </div>

              {/* Order History */}
              <div>
                <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-[#242124] mb-3">
                  Recent Orders ({orders.length})
                </h5>

                {orders.length === 0 ? (
                  <div className="p-4 bg-[#FFF0F2] rounded-2xl text-xs text-[#777078] text-center">
                    You haven&apos;t placed any celebration orders yet.
                  </div>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-2.5">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-3 bg-white rounded-xl border border-[#FEE2E8] text-xs flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-[#242124]">#{order.id}</div>
                          <div className="text-[11px] text-[#777078]">
                            {order.items.length} item(s) · {order.orderStatus.replace('_', ' ')}
                          </div>
                        </div>
                        <span className="font-serif font-bold text-[#E85D7D] tabular-nums">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#FFF0F2] flex items-center justify-between">
                {currentUser.isAdmin && (
                  <button
                    onClick={() => {
                      setIsAccountModalOpen(false);
                      setCurrentView('admin');
                    }}
                    className="text-xs font-semibold text-[#E85D7D] hover:underline"
                  >
                    Open Staff Portal →
                  </button>
                )}

                <button
                  onClick={logoutUser}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777078] hover:text-red-500 transition-colors ml-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-xs text-[#777078] leading-relaxed">
                Sign in to track your celebration deliveries, save anniversary dates, and access exclusive member coupons.
              </p>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Zaheer Ahmad"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="zaheerjkxai@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs rounded-full shadow-md transition-all active:scale-95"
              >
                Sign In or Register
              </button>

              <div className="pt-4 border-t border-[#FFF0F2] text-center">
                <button
                  type="button"
                  onClick={() => loginUser('zaheerjkxai@gmail.com', 'Zaheer Ahmad')}
                  className="text-xs text-[#E85D7D] font-medium hover:underline"
                >
                  Quick Sign-in as Demo Customer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
