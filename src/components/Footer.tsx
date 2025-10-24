import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 bg-secondary/30">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Love Calculator. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/skarlovecalculator" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/skarlovecal2025" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
            <FaTwitter />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/about-us" className="text-sm text-muted-foreground hover:text-primary">
            About Us
          </Link>
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
          <Link to="/contact-us" className="text-sm text-muted-foreground hover:text-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
