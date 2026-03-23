import { Link } from "react-router-dom";
import { Minus, Plus, X, ArrowRight, ShoppingBag, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-padding py-32 text-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-6" />
          <h1 className="editorial-heading mb-4">Your Bag is Empty</h1>
          <p className="body-elegant mb-8">Discover our curated collections and find something you love.</p>
          <Link to="/shop" className="btn-luxury-primary">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-padding py-12 md:py-20">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <h1 className="editorial-heading mb-2">Shopping Bag</h1>
          <p className="body-elegant mb-12">{totalItems} item{totalItems !== 1 ? "s" : ""} in your bag</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Items */}
          <div className="lg:col-span-2 space-y-0 divide-y divide-border">
            {items.map((item, i) => (
              <motion.div
                key={`${item.product.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex gap-5 md:gap-8 py-8 first:pt-0"
              >
                <Link to={`/product/${item.product.slug}`} className="w-28 md:w-36 aspect-[3/4] bg-secondary shrink-0 image-hover-zoom">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover object-top" />
                </Link>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${item.product.slug}`} className="font-display text-lg md:text-xl hover:text-primary transition-colors">
                          {item.product.name}
                        </Link>
                        <p className="font-body text-xs text-muted-foreground mt-1.5 tracking-wide">
                          {item.product.category} · {item.product.fabric}
                        </p>
                        <p className="font-body text-sm text-muted-foreground mt-1">Size: <span className="text-foreground font-medium">{item.size}</span></p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-2 hover:bg-secondary rounded-full transition-colors hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 h-10 flex items-center justify-center font-body text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-lg md:text-xl font-normal">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <div className="bg-secondary/60 p-6 md:p-8">
              <h2 className="font-body text-xs tracking-[0.2em] uppercase mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary text-xs font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-display text-xl">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-luxury-primary w-full text-center">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/shop" className="block text-center font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mt-4 hover:text-foreground transition-colors">
                Continue Shopping
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/40">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-body text-xs font-medium">Free Shipping</p>
                  <p className="font-body text-[10px] text-muted-foreground">On all orders</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/40">
                <Shield className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-body text-xs font-medium">Secure Payment</p>
                  <p className="font-body text-[10px] text-muted-foreground">256-bit SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
