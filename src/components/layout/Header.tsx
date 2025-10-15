import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = isAdmin 
    ? [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Cursos', href: '/admin/courses' },
        { label: 'Configurações', href: '/admin/settings' }
      ]
    : [
        { label: 'CURSOS', href: '/' },
        { label: 'SOBRE', href: '/sobre' },
        { label: 'CURSOS LIVRES', href: '/free-courses' },
        { label: 'ALUNO', href: '/student' },
        { label: 'DESCONTOS', href: '/discounts' },
        { label: 'AULAS GRATUITAS', href: '/free-classes' }
      ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center"  style={{ 'margin': '10px 30px' }}>
            <a href="/">
              <img
                src="/logo-ham copy.png"
                alt="Hospital Adventista Manaus"
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 font-medium transition-colors duration-200"
                style={{ '--hover-color': '#02558C' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#02558C'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.label}
                </a>
              ))}
              {!isAdmin && (
                <div className="px-3 py-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Pesquisar"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};