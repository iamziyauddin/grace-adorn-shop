import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-padding py-32 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-6" />
          <h1 className="editorial-heading mb-4">Your Wishlist is Empty</h1>
          <p className="body-elegant mb-8">Save pieces you love and come back to them anytime.</p>
          <Link to="/shop" className="btn-luxury-primary">
            <ShoppingBag className="w-4 h-4 mr-2" /> Explore Collection
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-padding py-12 md:py-20">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <h1 className="editorial-heading mb-2">Wishlist</h1>
          <p className="body-elegant mb-12">{items.length} saved piece{items.length !== 1 ? "s" : ""}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
