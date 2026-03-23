import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, CreditCard, Truck, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "card",
  });

  const shippingCost = 0;
  const tax = Math.round(totalPrice * 0.18);
  const orderTotal = totalPrice + shippingCost + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
    clearCart();
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <Layout>
        <div className="section-padding py-32 text-center">
          <h1 className="editorial-heading mb-4">Nothing to Checkout</h1>
          <p className="body-elegant mb-8">Add some items to your bag first.</p>
          <Link to="/shop" className="btn-luxury-primary">Shop Now</Link>
        </div>
      </Layout>
    );
  }

  if (step === "confirmation") {
    return (
      <Layout>
        <div className="section-padding py-20 md:py-32">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-lg mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="editorial-heading mb-4">Order Confirmed</h1>
            <p className="body-elegant mb-2">Thank you for your purchase, {formData.firstName}!</p>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Order #AT{Date.now().toString().slice(-8)} · A confirmation email has been sent to {formData.email || "your email"}.
            </p>
            <div className="bg-secondary/60 p-6 mb-8 text-left">
              <h3 className="font-body text-xs tracking-[0.2em] uppercase mb-4">Delivery Address</h3>
              <p className="font-body text-sm text-muted-foreground">
                {formData.firstName} {formData.lastName}<br />
                {formData.address}<br />
                {formData.city}, {formData.state} {formData.pincode}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="btn-luxury-primary">Continue Shopping</Link>
              <Link to="/" className="btn-luxury-outline">Back to Home</Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const inputClass = "w-full bg-transparent border border-border py-3 px-4 font-body text-sm focus:outline-none focus:border-primary transition-colors";
  const labelClass = "font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block";

  return (
    <Layout>
      <div className="section-padding py-8 md:py-16">
        <Link to="/cart" className="inline-flex items-center gap-2 font-body text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Bag
        </Link>

        <h1 className="editorial-heading mb-12">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-12 max-w-md">
          {[
            { key: "shipping", label: "Shipping", icon: Truck },
            { key: "payment", label: "Payment", icon: CreditCard },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center gap-3 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body transition-colors ${
                step === s.key ? "bg-primary text-primary-foreground" : s.key === "shipping" && step === "payment" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
              }`}>
                <s.icon className="w-3.5 h-3.5" />
              </div>
              <span className={`font-body text-xs tracking-[0.1em] uppercase ${step === s.key ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {i === 0 && <div className="flex-1 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <motion.form initial="hidden" animate="visible" variants={fadeInUp} onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="font-body text-xs tracking-[0.2em] uppercase mb-2">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Address *</label>
                  <input name="address" value={formData.address} onChange={handleChange} required className={inputClass} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>City *</label>
                    <input name="city" value={formData.city} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>State *</label>
                    <input name="state" value={formData.state} onChange={handleChange} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Pincode *</label>
                    <input name="pincode" value={formData.pincode} onChange={handleChange} required className={inputClass} />
                  </div>
                </div>
                <button type="submit" className="btn-luxury-primary mt-4">
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {step === "payment" && (
              <motion.form initial="hidden" animate="visible" variants={fadeInUp} onSubmit={handlePaymentSubmit} className="space-y-6">
                <h2 className="font-body text-xs tracking-[0.2em] uppercase mb-2">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: "card", label: "Credit / Debit Card" },
                    { value: "upi", label: "UPI" },
                    { value: "cod", label: "Cash on Delivery" },
                  ].map((opt) => (
                    <label key={opt.value} className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                      formData.paymentMethod === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={formData.paymentMethod === opt.value}
                        onChange={handleChange}
                        className="accent-primary"
                      />
                      <span className="font-body text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4 mt-6 p-6 bg-secondary/40">
                    <div>
                      <label className={labelClass}>Card Number</label>
                      <input placeholder="1234 5678 9012 3456" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Expiry</label>
                        <input placeholder="MM / YY" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>CVV</label>
                        <input placeholder="•••" className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep("shipping")} className="btn-luxury-outline">
                    Back
                  </button>
                  <button type="submit" className="btn-luxury-primary flex-1">
                    <Lock className="w-3.5 h-3.5 mr-2" />
                    Place Order · {formatPrice(orderTotal)}
                  </button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-secondary/60 p-6 md:p-8">
              <h2 className="font-body text-xs tracking-[0.2em] uppercase mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-18 object-cover object-top shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm truncate">{item.product.name}</p>
                      <p className="font-body text-xs text-muted-foreground">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <span className="font-body text-sm font-medium shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary text-xs">Complimentary</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between font-body text-lg font-medium">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
