import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  MapPin, 
  FileText, 
  Edit, 
  ArrowLeft,
  Heart,
  Clock,
  Users
} from 'lucide-react';
import { Employee, getEmployeeById } from '../../models/employee';

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        if (data) {
          setEmployee(data);
        } else {
          // Employee not found
          navigate('/employees');
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-lg text-gray-600">Employee not found</p>
        <Link 
          to="/employees"
          className="inline-block mt-4 text-blue-900 hover:text-blue-800"
        >
          Back to Employees
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/employees')}
            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">
            Employee Details
          </h1>
        </div>
        <Link
          to={`/employees/edit/${employee.id}`}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
        >
          <Edit size={16} className="mr-2" />
          Edit Employee
        </Link>
      </div>

      {/* Employee Summary Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-blue-900 text-white px-6 py-4"></div>
        <div className="px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 -mt-10 md:-mt-14">
              <div className="h-20 w-20 md:h-28 md:w-28 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center">
                <User size={36} className="text-blue-900" />
              </div>
            </div>
            <div className="md:ml-6 mt-4 md:mt-0">
              <h2 className="text-2xl font-bold text-gray-900">
                {`${employee.firstName} ${employee.lastName}`}
              </h2>
              <p className="text-gray-600 flex items-center mt-1">
                <Briefcase size={16} className="mr-2" />
                {employee.position} • {employee.department}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full 
                  ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 
                    employee.status === 'on_leave' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}
                >
                  {employee.status === 'active' ? 'Active' : 
                    employee.status === 'on_leave' ? 'On Leave' : 
                    'Inactive'}
                </span>
                <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                  Hire Date: {employee.hireDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-900 text-blue-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'attendance'
                  ? 'border-b-2 border-blue-900 text-blue-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('attendance')}
            >
              Attendance
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'payroll'
                  ? 'border-b-2 border-blue-900 text-blue-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('payroll')}
            >
              Payroll
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'documents'
                  ? 'border-b-2 border-blue-900 text-blue-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{employee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-gray-900">{employee.phone}</p>
                    </div>
                  </div>
                  {employee.address && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="text-gray-900">
                          {employee.address.street}<br />
                          {employee.address.city}, {employee.address.state} {employee.address.zipCode}<br />
                          {employee.address.country}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {employee.emergencyContact && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Heart className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Name</p>
                          <p className="text-gray-900">{employee.emergencyContact.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Relationship</p>
                          <p className="text-gray-900">{employee.emergencyContact.relationship}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-gray-900">{employee.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Employment Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Position</p>
                      <p className="text-gray-900">{employee.position}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Department</p>
                      <p className="text-gray-900">{employee.department}</p>
                    </div>
                  </div>
                  {employee.manager && (
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Manager</p>
                        <p className="text-gray-900">{employee.manager}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Hire Date</p>
                      <p className="text-gray-900">{employee.hireDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Salary</p>
                      <p className="text-gray-900">${employee.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Employee Timeline */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">History</h3>
                  <div className="flow-root">
                    <ul className="-mb-8">
                      <li>
                        <div className="relative pb-8">
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-white">
                                <Briefcase className="h-5 w-5 text-green-600" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-700">Hired as {employee.position}</p>
                              </div>
                              <div className="text-sm text-gray-500">
                                <Clock className="inline h-4 w-4 mr-1" />
                                {employee.hireDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      {/* More timeline items would be dynamically generated here */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Attendance Summary</h3>
                <div>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
                    defaultValue="may-2025"
                  >
                    <option value="may-2025">May 2025</option>
                    <option value="apr-2025">April 2025</option>
                    <option value="mar-2025">March 2025</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-green-200 p-3">
                      <UserCheck className="h-6 w-6 text-green-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-900">Present Days</p>
                      <p className="text-2xl font-semibold text-green-800">21</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-red-200 p-3">
                      <Clock className="h-6 w-6 text-red-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-red-900">Absent Days</p>
                      <p className="text-2xl font-semibold text-red-800">2</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-yellow-200 p-3">
                      <Calendar className="h-6 w-6 text-yellow-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-yellow-900">Leave Days</p>
                      <p className="text-2xl font-semibold text-yellow-800">1</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Recent Attendance</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025-05-03</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09:02 AM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05:15 PM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Present</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8h 13m</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025-05-02</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">08:55 AM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05:05 PM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Present</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8h 10m</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2025-05-01</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">On Leave</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Payroll Information</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                  <FileText className="mr-2 h-4 w-4" />
                  Print Payslip
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-blue-200 p-3">
                      <DollarSign className="h-6 w-6 text-blue-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-900">Base Salary</p>
                      <p className="text-2xl font-semibold text-blue-800">${employee.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-green-200 p-3">
                      <TrendingUp className="h-6 w-6 text-green-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-900">Year to Date</p>
                      <p className="text-2xl font-semibold text-green-800">${Math.round(employee.salary * 0.4).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-purple-200 p-3">
                      <Calendar className="h-6 w-6 text-purple-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-900">Last Pay Date</p>
                      <p className="text-2xl font-semibold text-purple-800">Apr 30, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Recent Payslips</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Period</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Apr 1-30, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(employee.salary / 12).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round((employee.salary / 12) * 0.25).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round((employee.salary / 12) * 0.75).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-900 hover:text-blue-800">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mar 1-31, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(employee.salary / 12).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round((employee.salary / 12) * 0.25).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round((employee.salary / 12) * 0.75).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-900 hover:text-blue-800">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Feb 1-28, 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round(employee.salary / 12).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round((employee.salary / 12) * 0.25).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round((employee.salary / 12) * 0.75).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-900 hover:text-blue-800">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Employee Documents</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Document
                </button>
              </div>
              
              {employee.documents && employee.documents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employee.documents.map((doc) => (
                        <tr key={doc.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-900 hover:text-blue-800 mr-4">View</button>
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    There are no documents available for this employee.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                    >
                      <FileText className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      Upload a document
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;