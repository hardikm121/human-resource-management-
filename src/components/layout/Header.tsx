import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center md:justify-start px-2 md:ml-6">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <Bell size={20} />
            </button>

            <div className="relative">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="hidden md:block">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    {currentUser?.name || 'User'}
                  </span>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              </button>

              {showDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg z-20"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button
                    onClick={handleLogout}
                    className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;