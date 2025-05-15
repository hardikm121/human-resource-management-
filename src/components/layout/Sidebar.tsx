import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  CalendarRange, 
  DollarSign, 
  BarChart2, 
  FileText, 
  Settings, 
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { currentUser } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Employees', path: '/employees', icon: <Users size={20} />, roles: ['admin', 'hr', 'manager'] },
    { name: 'Attendance', path: '/attendance', icon: <ClipboardCheck size={20} />, roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Leave', path: '/leave', icon: <CalendarRange size={20} />, roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Payroll', path: '/payroll', icon: <DollarSign size={20} />, roles: ['admin', 'hr'] },
    { name: 'Performance', path: '/performance', icon: <BarChart2 size={20} />, roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Documents', path: '/documents', icon: <FileText size={20} />, roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} />, roles: ['admin', 'hr'] },
  ];

  const filteredNavItems = navItems.filter(
    item => !currentUser?.role || item.roles.includes(currentUser.role)
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:z-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
          <div className="flex items-center">
            <span className="text-xl font-semibold tracking-wider">HR Manager</span>
          </div>
          <button
            className="p-1 -mr-1 rounded-md md:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`
                  }
                  onClick={() => {
                    if (isOpen) toggleSidebar();
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;