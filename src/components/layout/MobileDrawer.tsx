import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const links = [
  { label: "Home", to: "/" },
  { label: "Shop All", to: "/shop" },
  { label: "Bridal Wear", to: "/shop?category=bridal-wear" },
  { label: "Party Wear", to: "/shop?category=party-wear" },
  { label: "Festive Wear", to: "/shop?category=festive-wear" },
  { label: "Ready to Wear", to: "/shop?category=ready-to-wear" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function MobileDrawer({ open, onClose }: Props) {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    if (to.includes("?")) return location.pathname + location.search === to;
    return location.pathname.startsWith(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-background flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <span className="font-display text-lg tracking-[0.08em]">ĀTELIER</span>
              <button onClick={onClose} aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <ul className="space-y-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className={`block py-3 font-body text-sm tracking-[0.1em] uppercase transition-colors duration-500 ${
                        isActive(link.to) ? "text-primary" : "hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border/50 p-6 flex items-center gap-6">
              <Link to="/cart" onClick={onClose} className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-body font-medium flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Heart className="w-5 h-5" />
              <User className="w-5 h-5" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
