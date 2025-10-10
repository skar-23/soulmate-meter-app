import { Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Heart className="h-6 w-6 fill-primary text-primary animate-heartbeat" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Love Calculator
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant={location.pathname === "/name-calculator" ? "default" : "ghost"}
            size="sm"
          >
            <Link to="/name-calculator">Name Test</Link>
          </Button>
          <Button
            asChild
            variant={location.pathname === "/dob-calculator" ? "default" : "ghost"}
            size="sm"
          >
            <Link to="/dob-calculator">Date Test</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
