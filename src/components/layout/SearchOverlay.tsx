import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { products, formatPrice } from "@/data/products";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  const suggestions = ["Bridal Lehenga", "Silk Saree", "Party Gown", "Festive Sharara"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background backdrop-blur-md overflow-y-auto"
        >
          <div className="section-padding pt-8">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-xl tracking-[0.08em]">ĀTELIER</span>
              <button onClick={onClose} aria-label="Close search" className="p-2 hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative border-b-2 border-foreground/20 focus-within:border-primary transition-colors">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, fabrics, occasions..."
                  className="w-full bg-transparent py-4 pl-8 pr-4 font-body text-lg focus:outline-none"
                />
              </div>

              {query.length < 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-8"
                >
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-3">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="font-body text-sm px-5 py-2.5 border border-border hover:border-foreground transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {query.length >= 2 && (
                <div className="mt-6">
                  <p className="font-body text-xs text-muted-foreground mb-4">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  {results.length > 0 ? (
                    <div className="space-y-0 divide-y divide-border">
                      {results.map((product, i) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-4 py-4 hover:bg-secondary/50 transition-colors px-2 -mx-2"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-16 h-20 object-cover object-top shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-base truncate">{product.name}</h4>
                              <p className="font-body text-xs text-muted-foreground mt-0.5">
                                {product.category} · {product.fabric}
                              </p>
                            </div>
                            <span className="font-body text-sm font-medium shrink-0">
                              {formatPrice(product.price)}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-body text-sm text-muted-foreground py-8 text-center">
                      No products found for "{query}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
