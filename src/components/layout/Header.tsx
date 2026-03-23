import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop", hasMega: true },
  { label: "Bridal", to: "/shop?category=bridal-wear" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const location = useLocation();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentPath = location.pathname + location.search;

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    if (to.includes("?")) return currentPath === to;
    return location.pathname === to;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="font-display text-xl md:text-2xl tracking-[0.08em]">
              ĀTELIER
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.hasMega ? (
                    <Link
                      to={link.to}
                      onMouseEnter={() => setMegaMenuOpen(true)}
                      className={`relative px-5 py-2 font-body text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                        isActive(link.to)
                          ? "text-primary font-semibold"
                          : "text-foreground/70 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      to={link.to}
                      className={`relative px-5 py-2 font-body text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                        isActive(link.to)
                          ? "text-primary font-semibold"
                          : "text-foreground/70 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4 md:gap-5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-secondary transition-all duration-300 hover:text-primary"
              >
                <Search className="w-[17px] h-[17px]" />
              </button>
              <Link
                to="/wishlist"
                className="hidden md:flex relative items-center justify-center w-9 h-9 rounded-full hover:bg-secondary transition-all duration-300 hover:text-primary"
              >
                <Heart className="w-[17px] h-[17px]" />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-body font-medium flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-secondary transition-all duration-300 hover:text-primary"
              >
                <ShoppingBag className="w-[17px] h-[17px]" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-body font-medium flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <button
                aria-label="Account"
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-secondary transition-all duration-300 hover:text-primary"
              >
                <User className="w-[17px] h-[17px]" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <MegaMenu onClose={() => setMegaMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
