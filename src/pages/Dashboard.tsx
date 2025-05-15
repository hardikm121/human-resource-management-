import React from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock data for demonstration
const stats = [
  { name: 'Total Employees', value: '125', icon: <Users size={24} />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Present Today', value: '108', icon: <UserCheck size={24} />, color: 'bg-green-100 text-green-800' },
  { name: 'On Leave', value: '12', icon: <Calendar size={24} />, color: 'bg-amber-100 text-amber-800' },
  { name: 'Payroll Budget', value: '$254,300', icon: <DollarSign size={24} />, color: 'bg-purple-100 text-purple-800' },
];

const announcements = [
  { id: 1, title: 'Company Picnic', date: '2025-06-15', description: 'Annual company picnic at Riverside Park. All employees are invited to join with their families.' },
  { id: 2, title: 'Performance Review', date: '2025-05-10', description: 'Q2 performance review cycle starts next week. Please complete your self-assessments.' },
  { id: 3, title: 'Office Closure', date: '2025-05-27', description: 'Office will be closed on May 27th for Memorial Day.' },
];

const recentActivities = [
  { id: 1, action: 'New employee onboarded', name: 'Sarah Johnson', department: 'Marketing', time: '2 hours ago' },
  { id: 2, action: 'Leave request approved', name: 'Michael Chen', department: 'Engineering', time: '4 hours ago' },
  { id: 3, action: 'Performance review completed', name: 'Emily Rodriguez', department: 'Sales', time: '6 hours ago' },
  { id: 4, action: 'Salary adjustment', name: 'David Kim', department: 'Finance', time: '1 day ago' },
];

const upcomingEvents = [
  { id: 1, title: 'Team Building Workshop', date: '2025-05-15', time: '10:00 AM' },
  { id: 2, title: 'Quarterly Budget Meeting', date: '2025-05-20', time: '2:00 PM' },
  { id: 3, title: 'New Hire Orientation', date: '2025-05-22', time: '9:00 AM' },
];

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, {currentUser?.name || 'User'}
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening in your HR dashboard today
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full mr-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
            <button className="text-sm text-blue-900 hover:text-blue-800">View all</button>
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{announcement.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <button className="text-sm text-blue-900 hover:text-blue-800">View calendar</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3">
                <div className="bg-blue-50 text-blue-900 rounded p-2">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock size={14} className="mr-1" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            <button className="text-sm text-blue-900 hover:text-blue-800">View all activities</button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="py-3 flex items-start">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <FileText size={16} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-800">
                    <span className="font-medium">{activity.action}</span> - {activity.name}
                  </p>
                  <div className="flex text-sm text-gray-500 mt-1">
                    <span className="mr-2">{activity.department}</span> • 
                    <span className="ml-2">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Performance Metrics</h2>
            <button className="text-sm text-blue-900 hover:text-blue-800">Full report</button>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Employee Satisfaction</span>
                <span className="text-sm font-medium text-gray-700">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Retention Rate</span>
                <span className="text-sm font-medium text-gray-700">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-900 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Training Completion</span>
                <span className="text-sm font-medium text-gray-700">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="pt-2">
              <button className="flex items-center text-blue-900 hover:text-blue-800 text-sm font-medium">
                <TrendingUp size={16} className="mr-1" />
                View performance trends
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;