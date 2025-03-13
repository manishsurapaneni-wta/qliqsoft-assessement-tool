
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, BarChart, ClipboardCheck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavItem = ({ to, label, icon, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300",
        isActive 
          ? "bg-primary text-primary-foreground font-medium" 
          : "hover:bg-secondary"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { to: '/assessment', label: 'Assessment', icon: <ClipboardCheck className="h-4 w-4" /> },
    { to: '/dashboard', label: 'Dashboard', icon: <BarChart className="h-4 w-4" /> },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img 
            src="/logo.png" 
            alt="MedScore Logo" 
            className="h-8 w-auto" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <Button
          onClick={toggleMenu}
          variant="ghost"
          size="icon"
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform md:hidden bg-background/95 backdrop-blur-sm pt-16 px-4 transition-transform ease-in-out duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="space-y-1 flex flex-col">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
