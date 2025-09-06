import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { Button } from '../button/Button';

export function Header({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="font-bold text-xl">3D Shop</a>
          <nav className="hidden md:flex items-center gap-6 mx-6">
            <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Produkte
            </a>
            <a href="/kontakt" className="text-sm font-medium transition-colors hover:text-primary">
              Kontakt
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}