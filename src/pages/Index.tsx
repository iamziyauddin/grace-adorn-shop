import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import heroBridal from "@/assets/hero-bridal.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionFestive from "@/assets/collection-festive.jpg";
import collectionParty from "@/assets/collection-party.jpg";
import collectionReadytowear from "@/assets/collection-readytowear.jpg";

const heroSlides = [
  {
    image: heroBridal,
    tag: "The 2026 Bridal Collection",
    title: "Where Heritage Meets Elegance",
    desc: "Handcrafted by master artisans, each piece is a testament to centuries of Indian textile tradition.",
    cta: "Explore Bridal",
    to: "/shop?category=bridal-wear",
  },
  {
    image: hero2,
    tag: "Festive Season",
    title: "Woven in Gold, Draped in Grace",
    desc: "Celebrate every occasion with sarees and ensembles crafted from the finest Banarasi silks.",
    cta: "Shop Festive",
    to: "/shop?category=festive-wear",
  },
  {
    image: hero3,
    tag: "Party Collection",
    title: "Make Every Evening Unforgettable",
    desc: "Statement pieces in rich jewel tones — designed for nights that deserve to be remembered.",
    cta: "Discover Party Wear",
    to: "/shop?category=party-wear",
  },
  {
    image: hero4,
    tag: "Ready to Wear",
    title: "Effortless Luxury, Every Day",
    desc: "Modern silhouettes meet traditional craft in our everyday collection of kurtas and coords.",
    cta: "Shop Ready to Wear",
    to: "/shop?category=ready-to-wear",
  },
  {
    image: hero5,
    tag: "New Season",
    title: "The Art of Celebration",
    desc: "From intimate gatherings to grand galas — find your perfect ensemble this season.",
    cta: "Explore New Arrivals",
    to: "/shop",
  },
];

const bestsellers = products.filter((p) => p.isBestseller).slice(0, 6);
const newArrivals = products.filter((p) => p.isNew).slice(0, 6);

const collections = [
  { name: "Bridal", image: collectionBridal, to: "/shop?category=bridal-wear" },
  { name: "Festive", image: collectionFestive, to: "/shop?category=festive-wear" },
  { name: "Party", image: collectionParty, to: "/shop?category=party-wear" },
  { name: "Ready to Wear", image: collectionReadytowear, to: "/shop?category=ready-to-wear" },
];

const testimonials = [
  { name: "Priya Sharma", text: "The craftsmanship is extraordinary. My bridal lehenga was the most beautiful piece I've ever worn.", rating: 5 },
  { name: "Ananya Patel", text: "Every detail was perfect — from the fabric to the embroidery. Truly a luxury experience.", rating: 5 },
  { name: "Meera Kapoor", text: "Ātelier understands what modern Indian women want. Elegant, sophisticated, and timeless.", rating: 5 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Layout>
      {/* Hero Carousel */}
      <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].tag}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/25 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex items-center section-padding">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="max-w-lg"
            >
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-background/70 mb-4">
                {heroSlides[currentSlide].tag}
              </p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-background font-normal leading-[1.05] mb-6">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="font-body text-sm text-background/70 leading-relaxed mb-8 max-w-md">
                {heroSlides[currentSlide].desc}
              </p>
              <Link
                to={heroSlides[currentSlide].to}
                className="btn-luxury border-background/40 text-background hover:bg-background hover:text-foreground"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight className="w-4 h-4 ml-3" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-8 left-0 right-0 section-padding flex items-center justify-between">
          <div className="flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-[2px] transition-all duration-500 ${
                  i === currentSlide ? "w-10 bg-background" : "w-5 bg-background/40"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 border border-background/30 flex items-center justify-center text-background hover:bg-background/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 border border-background/30 flex items-center justify-center text-background hover:bg-background/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Collections grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section-padding py-20 md:py-32"
      >
        <motion.div variants={fadeInUp} className="text-center mb-14">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Curated</p>
          <h2 className="editorial-heading">Our Collections</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((col, i) => (
            <motion.div key={col.name} variants={fadeInUp}>
              <Link to={col.to} className="group image-hover-zoom block">
                <div className="aspect-[3/4] relative">
                  <img src={col.image} alt={col.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
                    <h3 className="font-display text-lg text-background">{col.name}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* New Arrivals */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section-padding py-20 md:py-32 bg-accent/30"
      >
        <motion.div variants={fadeInUp} className="flex items-end justify-between mb-14">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Just Landed</p>
            <h2 className="editorial-subheading">New Arrivals</h2>
          </div>
          <Link to="/shop" className="btn-luxury-ghost text-xs hidden md:inline-flex">
            View All <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {newArrivals.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Bestsellers */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="bg-secondary/50 section-padding py-20 md:py-32"
      >
        <motion.div variants={fadeInUp} className="flex items-end justify-between mb-14">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Most Loved</p>
            <h2 className="editorial-subheading">Bestsellers</h2>
          </div>
          <Link to="/shop" className="btn-luxury-ghost text-xs hidden md:inline-flex">
            View All <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {bestsellers.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Brand strip */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="section-padding py-20 md:py-28"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="editorial-heading mb-6">The Art of Adornment</h2>
          <p className="body-elegant max-w-xl mx-auto mb-10">
            Every Ātelier piece is born from a dialogue between heritage craft and modern sensibility.
            Our artisans spend weeks — sometimes months — bringing each design to life.
          </p>
          <Link to="/about" className="btn-luxury-outline">
            Our Story
          </Link>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="bg-secondary/50 section-padding py-20 md:py-28"
      >
        <motion.div variants={fadeInUp} className="text-center mb-14">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Voices</p>
          <h2 className="editorial-subheading">What Our Clients Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeInUp} className="text-center p-8">
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-sm leading-relaxed text-muted-foreground mb-5 italic">"{t.text}"</p>
              <p className="font-body text-xs tracking-[0.15em] uppercase">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Layout>
  );
}
