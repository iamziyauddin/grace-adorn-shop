import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-1">
            <h3 className="font-display text-xl tracking-[0.08em] mb-4">ĀTELIER</h3>
            <p className="font-body text-sm font-light leading-relaxed opacity-60">
              Handcrafted luxury for the modern woman. Each piece tells a story of heritage, artistry, and timeless elegance.
            </p>
          </div>

          <div>
            <h4 className="font-body text-[10px] tracking-[0.25em] uppercase mb-5 opacity-60">Shop</h4>
            <ul className="space-y-3">
              {["Bridal Wear", "Party Wear", "Festive Wear", "Ready to Wear"].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity duration-500">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[10px] tracking-[0.25em] uppercase mb-5 opacity-60">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Contact", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <span className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[10px] tracking-[0.25em] uppercase mb-5 opacity-60">Customer Care</h4>
            <ul className="space-y-3">
              {["Shipping", "Returns", "Size Guide", "Care Instructions"].map((item) => (
                <li key={item}>
                  <span className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-background/10">
          <p className="font-body text-xs opacity-40 tracking-wide">
            © 2026 Ātelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
