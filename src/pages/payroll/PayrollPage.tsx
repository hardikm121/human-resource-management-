import React, { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  Mail, 
  Download, 
  FileText, 
  Filter, 
  User,
  ChevronDown,
  PieChart,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { mockEmployees } from '../../models/employee';

// Mock payroll data
const payrollData = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    position: 'Software Engineer',
    department: 'Engineering',
    month: 'April',
    year: 2025,
    salary: 7916.67, // $95,000 / 12
    overtime: 250,
    bonus: 0,
    deductions: 2450.25,
    tax: 1580.33,
    netPay: 4136.09,
    status: 'Paid',
    paymentDate: '2025-04-30'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Jane Smith',
    position: 'Product Manager',
    department: 'Product',
    month: 'April',
    year: 2025,
    salary: 9166.67, // $110,000 / 12
    overtime: 0,
    bonus: 1000,
    deductions: 2980.25,
    tax: 1903.33,
    netPay: 5283.09,
    status: 'Paid',
    paymentDate: '2025-04-30'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Michael Johnson',
    position: 'UI Designer',
    department: 'Design',
    month: 'April',
    year: 2025,
    salary: 7083.33, // $85,000 / 12
    overtime: 0,
    bonus: 0,
    deductions: 2121.25,
    tax: 1345.83,
    netPay: 3616.25,
    status: 'Paid',
    paymentDate: '2025-04-30'
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Williams',
    position: 'HR Specialist',
    department: 'Human Resources',
    month: 'April',
    year: 2025,
    salary: 6250.00, // $75,000 / 12
    overtime: 125,
    bonus: 0,
    deductions: 1912.50,
    tax: 1187.50,
    netPay: 3275.00,
    status: 'Paid',
    paymentDate: '2025-04-30'
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: 'David Brown',
    position: 'Marketing Specialist',
    department: 'Marketing',
    month: 'April',
    year: 2025,
    salary: 6000.00, // $72,000 / 12
    overtime: 0,
    bonus: 250,
    deductions: 1875.00,
    tax: 1140.00,
    netPay: 3235.00,
    status: 'Paid',
    paymentDate: '2025-04-30'
  }
];

const PayrollPage: React.FC = () => {
  const [filterMonth, setFilterMonth] = useState('April');
  const [filterYear, setFilterYear] = useState(2025);
  const [filterDepartment, setFilterDepartment] = useState('All Departments');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPayslipModalOpen, setIsPayslipModalOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<any>(null);

  // Calculate totals
  const totalSalaries = payrollData.reduce((sum, p) => sum + p.salary, 0);
  const totalOvertime = payrollData.reduce((sum, p) => sum + p.overtime, 0);
  const totalBonuses = payrollData.reduce((sum, p) => sum + p.bonus, 0);
  const totalDeductions = payrollData.reduce((sum, p) => sum + p.deductions, 0);
  const totalTax = payrollData.reduce((sum, p) => sum + p.tax, 0);
  const totalNetPay = payrollData.reduce((sum, p) => sum + p.netPay, 0);

  // Departments for filter
  const departments = ['All Departments', 'Engineering', 'Product', 'Design', 'Human Resources', 'Marketing', 'Sales', 'Finance'];

  // Filtered payroll data
  const filteredPayroll = payrollData.filter(pay => {
    const matchesMonth = pay.month === filterMonth;
    const matchesYear = pay.year === filterYear;
    const matchesDepartment = filterDepartment === 'All Departments' || pay.department === filterDepartment;
    const matchesSearch = 
      pay.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesMonth && matchesYear && matchesDepartment && matchesSearch;
  });

  const handleViewPayslip = (payroll: any) => {
    setSelectedPayroll(payroll);
    setIsPayslipModalOpen(true);
  };

  // Mock years and months for filters
  const years = [2023, 2024, 2025];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Payroll Management</h1>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
            <FileText size={18} className="mr-2" />
            Generate Payslips
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
            <Download size={18} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Payroll Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Salaries</p>
              <p className="text-xl font-semibold">${totalSalaries.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <p>Overtime</p>
              <p className="font-medium text-gray-700">${totalOvertime.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p>Bonuses</p>
              <p className="font-medium text-gray-700">${totalBonuses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-red-100 text-red-800 mr-4">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Deductions</p>
              <p className="text-xl font-semibold">${totalDeductions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <p>Taxes</p>
              <p className="font-medium text-gray-700">${totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p>Other Deductions</p>
              <p className="font-medium text-gray-700">${(totalDeductions - totalTax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Net Pay</p>
              <p className="text-xl font-semibold">${totalNetPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <p>Employees</p>
              <p className="font-medium text-gray-700">{payrollData.length}</p>
            </div>
            <div>
              <p>Average Pay</p>
              <p className="font-medium text-gray-700">${(totalNetPay / payrollData.length).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Department Payroll Distribution</h2>
            
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">View:</span>
              <button className="py-1 px-2 bg-blue-900 text-white rounded-l">
                <PieChart size={16} />
              </button>
              <button className="py-1 px-2 bg-gray-100 text-gray-700 rounded-r">
                <BarChart3 size={16} />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <PieChart size={64} className="mx-auto text-gray-300" />
              <p className="mt-2">Payroll distribution chart will appear here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Monthly Payroll Trend</h2>
            
            <select
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
              defaultValue="2025"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp size={64} className="mx-auto text-gray-300" />
              <p className="mt-2">Monthly payroll trend will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <h2 className="text-lg font-medium text-gray-900">Payroll Records</h2>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(parseInt(e.target.value))}
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayroll.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No payroll records found
                  </td>
                </tr>
              ) : (
                filteredPayroll.map((payroll) => (
                  <tr key={payroll.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-900" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payroll.employeeName}</div>
                          <div className="text-sm text-gray-500">{payroll.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payroll.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(payroll.salary + payroll.overtime + payroll.bonus).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payroll.deductions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payroll.netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payroll.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewPayslip(payroll)}
                        className="text-blue-900 hover:text-blue-800 mr-3"
                      >
                        View
                      </button>
                      <button className="text-blue-900 hover:text-blue-800">
                        <Mail size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip Modal */}
      {isPayslipModalOpen && selectedPayroll && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Payslip - {selectedPayroll.month} {selectedPayroll.year}
                      </h3>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {selectedPayroll.status}
                      </span>
                    </div>
                    
                    <div className="mt-6 space-y-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Employee</span>
                          <span className="text-sm text-gray-900">{selectedPayroll.employeeName}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Position</span>
                          <span className="text-sm text-gray-900">{selectedPayroll.position}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Department</span>
                          <span className="text-sm text-gray-900">{selectedPayroll.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Payment Date</span>
                          <span className="text-sm text-gray-900">{selectedPayroll.paymentDate}</span>
                        </div>
                      </div>
                    
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Earnings</h4>
                        <div className="border-b border-gray-200 py-2 flex justify-between">
                          <span className="text-sm text-gray-600">Basic Salary</span>
                          <span className="text-sm text-gray-900">${selectedPayroll.salary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="border-b border-gray-200 py-2 flex justify-between">
                          <span className="text-sm text-gray-600">Overtime</span>
                          <span className="text-sm text-gray-900">${selectedPayroll.overtime.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="border-b border-gray-200 py-2 flex justify-between">
                          <span className="text-sm text-gray-600">Bonus</span>
                          <span className="text-sm text-gray-900">${selectedPayroll.bonus.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="py-2 flex justify-between font-medium">
                          <span className="text-sm text-gray-700">Gross Pay</span>
                          <span className="text-sm text-gray-900">${(selectedPayroll.salary + selectedPayroll.overtime + selectedPayroll.bonus).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Deductions</h4>
                        <div className="border-b border-gray-200 py-2 flex justify-between">
                          <span className="text-sm text-gray-600">Income Tax</span>
                          <span className="text-sm text-gray-900">${selectedPayroll.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="border-b border-gray-200 py-2 flex justify-between">
                          <span className="text-sm text-gray-600">Health Insurance</span>
                          <span className="text-sm text-gray-900">${(selectedPayroll.deductions - selectedPayroll.tax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="py-2 flex justify-between font-medium">
                          <span className="text-sm text-gray-700">Total Deductions</span>
                          <span className="text-sm text-gray-900">${selectedPayroll.deductions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                      
                      <div className="border-t-2 border-gray-200 pt-4">
                        <div className="flex justify-between font-semibold">
                          <span className="text-sm text-gray-900">Net Pay</span>
                          <span className="text-lg text-blue-900">${selectedPayroll.netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Download size={16} className="mr-2" />
                  Download PDF
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Mail size={16} className="mr-2" />
                  Email Payslip
                </button>
                <button
                  type="button"
                  onClick={() => setIsPayslipModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollPage;