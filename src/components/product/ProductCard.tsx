import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { toggleItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="image-hover-zoom relative aspect-[3/4] bg-secondary mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:bg-background ${
            wishlisted ? "bg-primary/10 opacity-100" : "bg-background/80 opacity-0 group-hover:opacity-100"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-primary text-primary" : ""}`} />
        </button>
        {product.isNew && (
          <span className="absolute top-4 left-4 font-body text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-3 py-1">
            New
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span className="absolute top-4 left-4 font-body text-[10px] tracking-[0.2em] uppercase bg-foreground text-background px-3 py-1">
            Bestseller
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-base font-normal">{product.name}</h3>
        <p className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="font-body text-sm font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="font-body text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
