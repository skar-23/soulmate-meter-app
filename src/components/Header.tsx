import { Heart, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="container flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <img
            src="/favicon.ico"
            alt="logo"
            className="h-6 w-6 animate-heartbeat"
          />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skar Love Calculator
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-4 md:gap-4 lg:gap-4 flex-wrap">
          <Button
            asChild
            variant={
              location.pathname === "/name-calculator" ? "default" : "ghost"
            }
            size="sm"
          >
            <Link to="/name-calculator">Name Test</Link>
          </Button>
          <Button
            asChild
            variant={
              location.pathname === "/dob-calculator" ? "default" : "ghost"
            }
            size="sm"
          >
            <Link to="/dob-calculator">Date Test</Link>
          </Button>
        </div>

        {/* Mobile hamburger menu */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="space-y-4">
                <nav className="flex flex-col space-y-2">
                  <Link to="/" className="font-semibold text-lg">
                    Home
                  </Link>
                  <Link to="/name-calculator" className="py-2">
                    Name Test
                  </Link>
                  <Link to="/dob-calculator" className="py-2">
                    Date Test
                  </Link>
                </nav>
              </div>
              <SheetClose asChild>
                <Button variant="ghost" className="mt-4">
                  Close
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
