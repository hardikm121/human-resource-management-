import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Employee, getEmployeeById } from '../../models/employee';

const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Human Resources', 'Finance', 'Sales'];

const initialEmployeeState: Employee = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  department: '',
  hireDate: new Date().toISOString().split('T')[0],
  salary: 0,
  status: 'active',
};

const EmployeeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee>(initialEmployeeState);
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchEmployee = async () => {
        try {
          const data = await getEmployeeById(id);
          if (data) {
            setEmployee(data);
          } else {
            navigate('/employees');
          }
        } catch (error) {
          console.error('Error fetching employee details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [id, isEditMode, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!employee.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!employee.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!employee.email.trim()) newErrors.email = 'Email is required';
    if (!employee.phone.trim()) newErrors.phone = 'Phone is required';
    if (!employee.position.trim()) newErrors.position = 'Position is required';
    if (!employee.department) newErrors.department = 'Department is required';
    if (!employee.hireDate) newErrors.hireDate = 'Hire date is required';
    if (employee.salary <= 0) newErrors.salary = 'Salary must be greater than 0';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (employee.email && !emailRegex.test(employee.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setEmployee(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to save the employee data
      
      // After successful save, navigate back to the employee list
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('An error occurred while saving the employee data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
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
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.firstName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.lastName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={employee.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="position"
                  id="position"
                  value={employee.position}
                  onChange={handleChange}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.position
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                />
                {errors.position && (
                  <p className="mt-2 text-sm text-red-600">{errors.position}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="department"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.department
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="mt-2 text-sm text-red-600">{errors.department}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">
                Hire date <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="hireDate"
                  id="hireDate"
                  value={employee.hireDate}
                  onChange={handleChange}
                  className={`block w-full rounded-md sm:text-sm ${
                    errors.hireDate
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                />
                {errors.hireDate && (
                  <p className="mt-2 text-sm text-red-600">{errors.hireDate}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  value={employee.salary || ''}
                  onChange={handleChange}
                  className={`block w-full pl-7 rounded-md sm:text-sm ${
                    errors.salary
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-900 focus:ring-blue-900'
                  }`}
                  placeholder="0.00"
                />
                {errors.salary && (
                  <p className="mt-2 text-sm text-red-600">{errors.salary}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  name="status"
                  value={employee.status}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:border-blue-900 focus:ring-blue-900 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="on_leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="manager" className="block text-sm font-medium text-gray-700">
                Manager
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="manager"
                  id="manager"
                  value={employee.manager || ''}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 focus:border-blue-900 focus:ring-blue-900 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/employees"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 ${
                saving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {saving ? (
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
                  Save Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;