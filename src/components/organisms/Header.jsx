import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@/layouts/Root";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ cartItemCount = 0, onSearch, onCartClick, onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Luxury", href: "/category/luxury" },
    { label: "Sport", href: "/category/sport" },
    { label: "Fashion", href: "/category/fashion" },
    { label: "Smartwatch", href: "/category/smartwatch" }
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMobileMenuToggle?.(!isMobileMenuOpen);
  };

  const handleSearch = (searchTerm) => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                <ApperIcon name="Clock" className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-primary">
                Timepiece Gallery
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-secondary hover:text-accent transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

{/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <Button
                variant="ghost"
                onClick={onCartClick}
                className="relative"
              >
                <ApperIcon name="ShoppingCart" className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {/* Auth Actions */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm text-secondary">
                    Welcome, {user?.firstName || user?.name || 'User'}
                  </span>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="text-sm"
                  >
                    <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="text-sm"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/signup")}
                    className="text-sm"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                onClick={handleMobileMenuToggle}
                className="md:hidden"
              >
                <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search - visible when menu closed */}
          {!isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-3">
{navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-secondary hover:text-accent transition-colors duration-200 font-medium border-b border-gray-100 last:border-b-0"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="text-sm text-secondary py-2">
                      Welcome, {user?.firstName || user?.name || 'User'}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full justify-start"
                    >
                      <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/login");
                      }}
                      className="w-full justify-start"
                    >
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/signup");
                      }}
                      className="w-full justify-start"
                    >
                      Sign Up
                    </Button>
</div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;