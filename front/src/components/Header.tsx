import { Bus, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"signin" | "signup" | null>(null);
  const [user, setUser] = useState<{ fullName: string } | null>(null);

  const navLinks = [
    { href: "#destinations", label: "Destinations" },
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#contact", label: "Contact" },
  ];

  const closeModal = () => setActiveModal(null);
  const handleLogout = () => setUser(null);

  const handleAuthSuccess = (name: string) => {
    setUser({ fullName: name });
    closeModal();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-[#f37021] flex items-center justify-center shadow-md">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block font-bold text-lg">
              <span>SchoolTrip</span><span className="text-[#f37021]">.ge</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground font-medium transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <User className="w-4 h-4 text-[#f37021]" />
                  {user.fullName}
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs font-black text-red-500 hover:text-red-700 border-l pl-4 border-gray-300 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  LOG OUT
                </button>
              </div>
            ) : (
              <>
                <Button variant="hero" size="lg" onClick={() => setActiveModal("signin")}>
                  Sign In
                </Button>
                <Button variant="hero" size="lg" onClick={() => setActiveModal("signup")}>
                  Sign Up
                </Button>
              </>
            )}
            <Button variant="hero" size="lg">
              Plan Your Trip
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MODAL PORTAL - Teleports form to body so it isn't cut off */}
      {activeModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in duration-200">
            <button onClick={closeModal} className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            {activeModal === "signin" ? (
              <SignIn onLoginSuccess={handleAuthSuccess} />
            ) : (
              <SignUp onSignupSuccess={handleAuthSuccess} />
            )}
          </div>
          {/* Overlay click closes modal */}
          <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;