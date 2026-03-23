import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const contactInfo = [
  { icon: MapPin, title: "Visit Us", lines: ["42 Linking Road, Khar West", "Mumbai, Maharashtra 400052"] },
  { icon: Phone, title: "Call Us", lines: ["+91 22 4567 8900", "+91 98765 43210"] },
  { icon: Mail, title: "Email Us", lines: ["hello@atelier.in", "bridal@atelier.in"] },
  { icon: Clock, title: "Hours", lines: ["Mon — Sat: 11am — 8pm", "Sunday: By appointment"] },
];

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-12 md:pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Get in Touch</p>
          <h1 className="editorial-heading mb-6">We'd Love to Hear From You</h1>
          <p className="body-elegant max-w-lg">
            Whether you're looking for a bridal consultation, have a question about an order, 
            or simply want to learn more — we're here to help.
          </p>
        </motion.div>
      </section>

      <div className="section-padding pb-20 md:pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 md:gap-20"
        >
          {/* Contact form */}
          <motion.div variants={fadeInUp}>
            <h2 className="editorial-subheading mb-8">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Subject
                </label>
                <select className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors">
                  <option value="">Select a topic</option>
                  <option value="bridal">Bridal Consultation</option>
                  <option value="order">Order Enquiry</option>
                  <option value="custom">Custom Design</option>
                  <option value="general">General Question</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border-b border-border py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us more about what you're looking for..."
                />
              </div>
              <button type="submit" className="btn-luxury-primary mt-4">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={fadeInUp}>
            <h2 className="editorial-subheading mb-8">Contact Information</h2>
            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-10 h-10 border border-border/50 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body text-xs tracking-[0.15em] uppercase mb-2">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="font-body text-sm text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-10">
              <h3 className="font-body text-xs tracking-[0.15em] uppercase mb-5">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 aspect-[4/3] bg-secondary relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Our Flagship Store</p>
                  <p className="font-body text-sm mt-1">Khar West, Mumbai</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
