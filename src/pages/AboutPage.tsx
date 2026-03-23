import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import aboutHero from "@/assets/about-hero.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionFestive from "@/assets/collection-festive.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const values = [
  { title: "Heritage Craft", desc: "We partner with master artisans from Lucknow, Varanasi, and Jaipur — guardians of centuries-old embroidery traditions." },
  { title: "Sustainable Luxury", desc: "Every fabric is ethically sourced. We believe true luxury honours both the maker and the earth." },
  { title: "Modern Sensibility", desc: "Traditional silhouettes reimagined for the contemporary woman — timeless yet unmistakably current." },
  { title: "Bespoke Excellence", desc: "Each piece can be customised to your exact measurements, ensuring a fit as unique as you." },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img src={aboutHero} alt="Ātelier workshop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-background/70 mb-4">Our Story</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-background font-normal leading-[1.05]">
              The Art Behind<br />the Adornment
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="section-padding py-20 md:py-32"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Founded 2018</p>
              <h2 className="editorial-subheading mb-6">A Bridge Between Worlds</h2>
              <div className="space-y-4">
                <p className="body-elegant">
                  Ātelier was born from a simple conviction: that India's extraordinary textile heritage deserves a contemporary voice.
                  Founded in 2018 by designer Aarav Mehra, we set out to create a house where ancient embroidery techniques
                  meet modern silhouettes.
                </p>
                <p className="body-elegant">
                  Every collection begins with a journey — to the handloom clusters of Varanasi, the zardozi workshops of Lucknow,
                  the block-printing villages of Rajasthan. These encounters shape our designs and deepen our respect for the hands
                  that bring them to life.
                </p>
                <p className="body-elegant">
                  Today, Ātelier works with over 200 artisan families across India, preserving techniques that might otherwise
                  fade from memory — while giving them a canvas worthy of their craft.
                </p>
              </div>
            </div>
            <div className="image-hover-zoom">
              <img src={collectionBridal} alt="Artisan craftsmanship" className="w-full aspect-[3/4] object-cover object-top" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="bg-secondary/50 section-padding py-20 md:py-32"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">What Guides Us</p>
          <h2 className="editorial-heading">Our Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((v, i) => (
            <motion.div key={i} variants={fadeInUp} className="text-center p-6">
              <div className="w-12 h-[1.5px] bg-primary mx-auto mb-6" />
              <h3 className="font-display text-xl mb-3">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Commitment */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="section-padding py-20 md:py-32"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="image-hover-zoom order-2 md:order-1">
            <img src={collectionFestive} alt="Sustainable practices" className="w-full aspect-[3/4] object-cover object-top" />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Commitment</p>
            <h2 className="editorial-subheading mb-6">Beyond Beautiful</h2>
            <div className="space-y-4">
              <p className="body-elegant">
                We believe luxury must be responsible. Every Ātelier piece is crafted with ethically sourced fabrics,
                fair wages for artisans, and minimal environmental impact.
              </p>
              <p className="body-elegant">
                Our packaging is 100% recyclable, our workshops are solar-powered, and we invest 5% of revenue
                back into artisan communities — funding education, healthcare, and skill development.
              </p>
            </div>
            <Link to="/shop" className="btn-luxury-outline mt-8 inline-flex">
              Explore Our best Collections
            </Link>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
}
