import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleSignOut = async () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveSection('home');
    } else if (path === '/how-it-works') {
      setActiveSection('how-it-works');
    } else if (path === '/career-paths') {
      setActiveSection('career-paths');
    } else if (path === '/fun-tools') {
      setActiveSection('fun-tools');
    } else if (path === '/faq') {
      setActiveSection('faq');
    } else {
      setActiveSection('');
    }
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Career Paths', path: '/career-paths' },
    { label: 'Fun Tools', path: '/fun-tools' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Courses', path: '/courses' },
    { label: 'Contact us', path: '/contact' },
    ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Talent Trail Maps
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          {user ? (
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button size="sm" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location.pathname === link.path ? 'text-primary font-semibold' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <Button variant="outline" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                    Sign Out
                  </Button>
                ) : (
                  <Button onClick={() => { navigate('/auth'); setIsOpen(false); }}>
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
