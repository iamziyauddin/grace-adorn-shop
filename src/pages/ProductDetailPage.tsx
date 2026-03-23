import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, Star, ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const wishlisted = product ? isInWishlist(product.id) : false;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (!product) {
    return (
      <Layout>
        <div className="section-padding py-32 text-center">
          <h1 className="editorial-heading mb-4">Product Not Found</h1>
          <Link to="/shop" className="btn-luxury-outline">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize);
    }
    toast({ title: "Added to bag", description: `${product.name} — Size ${selectedSize}` });
  };

  return (
    <Layout>
      <div className="section-padding py-8 md:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs tracking-wide text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              ref={imageContainerRef}
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[3/4] bg-secondary relative overflow-hidden cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-300"
                style={isZoomed ? {
                  transform: "scale(2.5)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                } : {}}
              />
              <div className={`absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100 group-hover:opacity-100 md:opacity-0'}`}>
                <ZoomIn className="w-4 h-4 text-foreground" />
              </div>
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-24 border-2 transition-colors duration-300 ${
                      selectedImage === i ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-8">
            <div>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
                <span className="font-body text-xs text-muted-foreground ml-2">(12 reviews)</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xl font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="font-body text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="font-body text-xs text-primary font-medium">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="body-elegant">{product.description}</p>

            {/* Size selection */}
            <div>
              <p className="font-body text-xs tracking-[0.15em] uppercase mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-11 px-4 border font-body text-xs tracking-wider transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-body text-xs tracking-[0.15em] uppercase mb-3">Quantity</p>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 h-11 flex items-center justify-center font-body text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="btn-luxury-primary flex-1">
                Add to Bag
              </button>
              <button
                onClick={() => {
                  if (product) toggleItem(product);
                  toast({ title: wishlisted ? "Removed from wishlist" : "Added to wishlist" });
                }}
                className={`btn-luxury-outline w-12 !px-0 flex items-center justify-center ${wishlisted ? "border-primary" : ""}`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-primary text-primary" : ""}`} />
              </button>
            </div>

            {/* Details accordion */}
            <div className="border-t border-border pt-8 space-y-4">
              <h3 className="font-body text-xs tracking-[0.15em] uppercase">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="flex gap-6 pt-2 font-body text-xs text-muted-foreground">
                <span>Fabric: {product.fabric}</span>
                <span>Color: {product.color}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 md:mt-32">
            <h2 className="editorial-subheading mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
