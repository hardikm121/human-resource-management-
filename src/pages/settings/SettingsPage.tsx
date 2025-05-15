import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Layout, 
  Users, 
  Mail, 
  Save, 
  Building,
  Shield 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Mock company info
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Acme Corporation',
    address: '123 Business Ave, Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    phone: '(555) 123-4567',
    email: 'info@acmecorp.com',
    website: 'www.acmecorp.com',
    industry: 'Technology',
    size: '100-500',
    foundedYear: '2010'
  });

  // Mock user settings
  const [userSettings, setUserSettings] = useState({
    firstName: currentUser?.name.split(' ')[0] || '',
    lastName: currentUser?.name.split(' ')[1] || '',
    email: currentUser?.email || '',
    role: currentUser?.role || '',
    phone: '(555) 987-6543',
    language: 'English',
    timezone: 'Pacific Time (PT)',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light'
  });

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: true,
    leaveRequests: true,
    performance: true,
    payroll: true,
    documents: true,
    systemUpdates: false,
    dailyDigest: false
  });

  // Mock security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: '90 days',
    sessionTimeout: '1 hour',
    loginNotifications: true
  });

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value
    });
  };

  const handleUserSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserSettings({
      ...userSettings,
      [name]: value
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
            <nav className="py-4">
              <ul className="space-y-1">
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} className="mr-3" />
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                      activeTab === 'company'
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('company')}
                  >
                    <Building size={18} className="mr-3" />
                    <span>Company</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                      activeTab === 'notifications'
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell size={18} className="mr-3" />
                    <span>Notifications</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                      activeTab === 'security'
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('security')}
                  >
                    <Lock size={18} className="mr-3" />
                    <span>Security</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                      activeTab === 'appearance'
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('appearance')}
                  >
                    <Layout size={18} className="mr-3" />
                    <span>Appearance</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                      activeTab === 'users'
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('users')}
                  >
                    <Users size={18} className="mr-3" />
                    <span>Users & Permissions</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                      activeTab === 'email'
                        ? 'bg-blue-50 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('email')}
                  >
                    <Mail size={18} className="mr-3" />
                    <span>Email Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={userSettings.firstName}
                        onChange={handleUserSettingsChange}
                        className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={userSettings.lastName}
                        onChange={handleUserSettingsChange}
                        className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={userSettings.email}
                        onChange={handleUserSettingsChange}
                        className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={userSettings.phone}
                        onChange={handleUserSettingsChange}
                        className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={userSettings.language}
                        onChange={handleUserSettingsChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={userSettings.timezone}
                        onChange={handleUserSettingsChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                      >
                        <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                        <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                        <option value="Central Time (CT)">Central Time (CT)</option>
                        <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                        <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
                        <option value="Central European Time (CET)">Central European Time (CET)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                        Date Format
                      </label>
                      <select
                        id="dateFormat"
                        name="dateFormat"
                        value={userSettings.dateFormat}
                        onChange={handleUserSettingsChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'company' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Company Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={companyInfo.name}
                        onChange={handleCompanyInfoChange}
                        className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                        Industry
                      </label>
                      <input
                        type="text"
                        name="industry"
                        id="industry"
                        value={companyInfo.industry}
                        onChange={handleCompanyInfoChange}
                        className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                        Company Size
                      </label>
                      <select
                        id="size"
                        name="size"
                        value={companyInfo.size}
                        onChange={handleCompanyInfoChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-100">51-100 employees</option>
                        <option value="100-500">100-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">
                        Founded Year
                      </label>
                      <input
                        type="text"
                        name="foundedYear"
                        id="foundedYear"
                        value={companyInfo.foundedYear}
                        onChange={handleCompanyInfoChange}
                        className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={companyInfo.email}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={companyInfo.phone}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          id="website"
                          value={companyInfo.website}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={companyInfo.address}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={companyInfo.city}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State/Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={companyInfo.state}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          id="zipCode"
                          value={companyInfo.zipCode}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={companyInfo.country}
                          onChange={handleCompanyInfoChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive email notifications</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="emailNotifications" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                            checked={notificationSettings.emailNotifications}
                            onChange={handleNotificationChange}
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Browser Notifications</h3>
                        <p className="text-sm text-gray-500">Receive browser notifications</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="browserNotifications" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                            checked={notificationSettings.browserNotifications}
                            onChange={handleNotificationChange}
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Notification Types</h3>
                      
                      <div className="space-y-3 ml-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="leaveRequests" 
                            id="leaveRequests" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded mr-2"
                            checked={notificationSettings.leaveRequests}
                            onChange={handleNotificationChange}
                          />
                          <label htmlFor="leaveRequests" className="text-sm text-gray-700">
                            Leave Requests
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="performance" 
                            id="performance" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded mr-2"
                            checked={notificationSettings.performance}
                            onChange={handleNotificationChange}
                          />
                          <label htmlFor="performance" className="text-sm text-gray-700">
                            Performance Reviews
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="payroll" 
                            id="payroll" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded mr-2"
                            checked={notificationSettings.payroll}
                            onChange={handleNotificationChange}
                          />
                          <label htmlFor="payroll" className="text-sm text-gray-700">
                            Payroll Processing
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="documents" 
                            id="documents" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded mr-2"
                            checked={notificationSettings.documents}
                            onChange={handleNotificationChange}
                          />
                          <label htmlFor="documents" className="text-sm text-gray-700">
                            Document Updates
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="systemUpdates" 
                            id="systemUpdates" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded mr-2"
                            checked={notificationSettings.systemUpdates}
                            onChange={handleNotificationChange}
                          />
                          <label htmlFor="systemUpdates" className="text-sm text-gray-700">
                            System Updates
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="dailyDigest" 
                            id="dailyDigest" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded mr-2"
                            checked={notificationSettings.dailyDigest}
                            onChange={handleNotificationChange}
                          />
                          <label htmlFor="dailyDigest" className="text-sm text-gray-700">
                            Daily Digest
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Security Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            name="twoFactorAuth" 
                            className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                            checked={securitySettings.twoFactorAuth}
                            onChange={(e) => handleSecurityChange(e as any)}
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="py-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Password Expiry</h3>
                      <p className="text-sm text-gray-500 mb-3">Set how often passwords should be changed</p>
                      
                      <select
                        name="passwordExpiry"
                        value={securitySettings.passwordExpiry}
                        onChange={handleSecurityChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                      >
                        <option value="30 days">30 days</option>
                        <option value="60 days">60 days</option>
                        <option value="90 days">90 days</option>
                        <option value="180 days">180 days</option>
                        <option value="Never">Never</option>
                      </select>
                    </div>
                    
                    <div className="py-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Session Timeout</h3>
                      <p className="text-sm text-gray-500 mb-3">Set how long users can be inactive before being logged out</p>
                      
                      <select
                        name="sessionTimeout"
                        value={securitySettings.sessionTimeout}
                        onChange={handleSecurityChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                      >
                        <option value="15 minutes">15 minutes</option>
                        <option value="30 minutes">30 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="2 hours">2 hours</option>
                        <option value="4 hours">4 hours</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center py-3">
                      <input 
                        type="checkbox" 
                        name="loginNotifications" 
                        id="loginNotifications" 
                        className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded mr-2"
                        checked={securitySettings.loginNotifications}
                        onChange={(e) => handleSecurityChange(e as any)}
                      />
                      <label htmlFor="loginNotifications" className="text-sm text-gray-700">
                        Notify me about new logins to my account
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Shield className="h-5 w-5 text-blue-900" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-900">Password Requirements</h3>
                        <div className="mt-2 text-sm text-blue-800 space-y-1">
                          <p>• Minimum of 8 characters</p>
                          <p>• At least one uppercase letter</p>
                          <p>• At least one lowercase letter</p>
                          <p>• At least one number</p>
                          <p>• At least one special character</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Appearance Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className={`
                          relative rounded-md border p-3 flex flex-col items-center cursor-pointer
                          ${userSettings.theme === 'light' ? 'border-blue-900 ring-2 ring-blue-900' : 'border-gray-200 hover:border-gray-300'}
                        `}>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200">
                            <Settings size={20} className="text-gray-900" />
                          </span>
                          <div className="mt-2 text-center">
                            <h3 className="text-sm font-medium text-gray-900">Light</h3>
                          </div>
                          <input
                            type="radio"
                            name="theme"
                            value="light"
                            checked={userSettings.theme === 'light'}
                            onChange={handleUserSettingsChange}
                            className="sr-only"
                          />
                        </div>
                        
                        <div className={`
                          relative rounded-md border p-3 flex flex-col items-center cursor-pointer
                          ${userSettings.theme === 'dark' ? 'border-blue-900 ring-2 ring-blue-900' : 'border-gray-200 hover:border-gray-300'}
                        `}>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900">
                            <Settings size={20} className="text-white" />
                          </span>
                          <div className="mt-2 text-center">
                            <h3 className="text-sm font-medium text-gray-900">Dark</h3>
                          </div>
                          <input
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={userSettings.theme === 'dark'}
                            onChange={handleUserSettingsChange}
                            className="sr-only"
                          />
                        </div>
                        
                        <div className={`
                          relative rounded-md border p-3 flex flex-col items-center cursor-pointer
                          ${userSettings.theme === 'system' ? 'border-blue-900 ring-2 ring-blue-900' : 'border-gray-200 hover:border-gray-300'}
                        `}>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-white">
                            <Settings size={20} className="text-blue-900" />
                          </span>
                          <div className="mt-2 text-center">
                            <h3 className="text-sm font-medium text-gray-900">System</h3>
                          </div>
                          <input
                            type="radio"
                            name="theme"
                            value="system"
                            checked={userSettings.theme === 'system'}
                            onChange={handleUserSettingsChange}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Sidebar Position</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative rounded-md border border-gray-200 hover:border-gray-300 p-3 flex flex-col items-center cursor-pointer">
                          <div className="h-20 w-full bg-gray-100 rounded-md flex overflow-hidden">
                            <div className="w-1/5 bg-blue-900"></div>
                            <div className="w-4/5 p-2">
                              <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
                              <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                            </div>
                          </div>
                          <div className="mt-2 text-center">
                            <h3 className="text-sm font-medium text-gray-900">Left</h3>
                          </div>
                          <input
                            type="radio"
                            name="sidebarPosition"
                            value="left"
                            checked={true}
                            className="sr-only"
                          />
                        </div>
                        
                        <div className="relative rounded-md border border-gray-200 hover:border-gray-300 p-3 flex flex-col items-center cursor-pointer opacity-50">
                          <div className="h-20 w-full bg-gray-100 rounded-md flex overflow-hidden">
                            <div className="w-4/5 p-2">
                              <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
                              <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                            </div>
                            <div className="w-1/5 bg-blue-900"></div>
                          </div>
                          <div className="mt-2 text-center">
                            <h3 className="text-sm font-medium text-gray-900">Right</h3>
                            <p className="text-xs text-gray-500">(Coming soon)</p>
                          </div>
                          <input
                            type="radio"
                            name="sidebarPosition"
                            value="right"
                            disabled
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Font Size</h3>
                      <input
                        type="range"
                        min="12"
                        max="20"
                        step="1"
                        defaultValue="16"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 ${
                        isSaving ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Placeholder content for other tabs */}
            {activeTab === 'users' && (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">User Management</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage users and permissions in this section
                </p>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="text-center py-12">
                <Mail size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Email Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure email templates and settings in this section
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;