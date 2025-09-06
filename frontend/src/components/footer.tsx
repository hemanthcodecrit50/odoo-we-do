import { Heart, Leaf, Recycle } from 'lucide-react';
import Logo from './logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your marketplace for pre-loved treasures. Give items a second life and discover unique finds.
            </p>
          </div>
          <div>
            <h3 className="font-semibold tracking-wide">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Apparel</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Furniture</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Electronics</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Home Goods</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold tracking-wide">About Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Our Story</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Sustainability</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold tracking-wide">Our Promise</h3>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span>Eco-Friendly Shopping</span>
                </p>
                <p className="flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-primary" />
                    <span>Support Circular Economy</span>
                </p>
                <p className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Find What You Love</span>
                </p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EcoFinds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
