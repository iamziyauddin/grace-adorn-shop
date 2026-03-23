import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

const PRODUCTS_PER_PAGE = 12;

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    setCurrentPage(1);
    if (!categoryFilter) return products;
    return products.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === categoryFilter
    );
  }, [categoryFilter]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const activeCategory = categories.find((c) => c.slug === categoryFilter);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="section-padding py-12 md:py-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 font-body text-xs tracking-wide text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">
              {activeCategory ? activeCategory.name : "All Products"}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="editorial-heading mb-3">
            {activeCategory ? activeCategory.name : "Shop All"}
          </h1>
          <p className="body-elegant">{filtered.length} pieces</p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Link
            to="/shop"
            className={`font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-500 ${
              !categoryFilter
                ? "bg-foreground text-background border-foreground"
                : "border-border hover:border-foreground"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className={`font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-500 ${
                categoryFilter === cat.slug
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${categoryFilter}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="body-elegant">No products found in this category.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border border-border hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 flex items-center justify-center font-body text-sm transition-all duration-300 ${
                  currentPage === page
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-border hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
