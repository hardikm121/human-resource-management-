import React, { useState } from 'react';
import { Plus, Calendar, Clock, Check, X, FileText, Filter } from 'lucide-react';

// Mock leave data
const leaveRequests = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    type: 'Sick Leave',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    days: 2,
    reason: 'Not feeling well, need to rest and recover.',
    status: 'pending',
    appliedOn: '2025-05-10'
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Jane Smith',
    type: 'Vacation',
    startDate: '2025-06-01',
    endDate: '2025-06-07',
    days: 7,
    reason: 'Annual family vacation to Hawaii.',
    status: 'approved',
    appliedOn: '2025-04-15',
    approvedBy: 'HR Manager',
    approvedOn: '2025-04-20'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Michael Johnson',
    type: 'Personal Leave',
    startDate: '2025-05-20',
    endDate: '2025-05-20',
    days: 1,
    reason: 'Need to attend a family event.',
    status: 'rejected',
    appliedOn: '2025-05-05',
    rejectedBy: 'Department Manager',
    rejectedOn: '2025-05-08',
    rejectionReason: 'Critical project deadline on the same day.'
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Williams',
    type: 'Maternity Leave',
    startDate: '2025-07-01',
    endDate: '2025-10-01',
    days: 92,
    reason: 'Maternity leave for the birth of my first child.',
    status: 'approved',
    appliedOn: '2025-05-01',
    approvedBy: 'HR Manager',
    approvedOn: '2025-05-05'
  }
];

// Define leave balance for the current user
const leaveBalance = {
  sick: { total: 10, used: 3, remaining: 7 },
  vacation: { total: 20, used: 5, remaining: 15 },
  personal: { total: 5, used: 2, remaining: 3 },
  maternity: { total: 90, used: 0, remaining: 90 }
};

const leaveTypes = [
  { id: 'sick', name: 'Sick Leave' },
  { id: 'vacation', name: 'Vacation' },
  { id: 'personal', name: 'Personal Leave' },
  { id: 'maternity', name: 'Maternity Leave' },
  { id: 'paternity', name: 'Paternity Leave' },
  { id: 'bereavement', name: 'Bereavement Leave' },
  { id: 'unpaid', name: 'Unpaid Leave' }
];

const LeavePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // New leave form state
  const [newLeave, setNewLeave] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    days: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setNewLeave(prev => {
      const updated = { ...prev, [name]: value };
      
      // Calculate days automatically when dates change
      if (name === 'startDate' || name === 'endDate') {
        if (updated.startDate && updated.endDate) {
          const start = new Date(updated.startDate);
          const end = new Date(updated.endDate);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          
          if (diffDays > 0) {
            updated.days = diffDays;
          }
        }
      }
      
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be code to submit the new leave request
    setIsModalOpen(false);
    // Reset form
    setNewLeave({
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
      days: 1
    });
  };

  const toggleLeaveDetailsModal = (leave: any = null) => {
    setSelectedLeave(leave);
  };

  // Filter leaves based on status and search term
  const filteredLeaves = leaveRequests.filter(leave => {
    const matchesStatus = statusFilter === 'all' || leave.status === statusFilter;
    const matchesSearch = 
      leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Calculate remaining leaves by type
  const calculateRemainingByType = (type: string) => {
    const typeKey = type.toLowerCase().split(' ')[0];
    return leaveBalance[typeKey as keyof typeof leaveBalance]?.remaining || 0;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Leave Management</h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
        >
          <Plus size={18} className="mr-2" />
          Apply for Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sick Leave</p>
              <p className="text-xl font-semibold">{leaveBalance.sick.remaining} / {leaveBalance.sick.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vacation</p>
              <p className="text-xl font-semibold">{leaveBalance.vacation.remaining} / {leaveBalance.vacation.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Personal Leave</p>
              <p className="text-xl font-semibold">{leaveBalance.personal.remaining} / {leaveBalance.personal.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-pink-100 text-pink-800 mr-4">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Maternity Leave</p>
              <p className="text-xl font-semibold">{leaveBalance.maternity.remaining} / {leaveBalance.maternity.total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <h2 className="text-lg font-medium text-gray-900">Leave Requests</h2>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search leaves..."
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
                  Leave Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Range
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No leave requests found
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.days}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.appliedOn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleLeaveDetailsModal(leave)}
                        className="text-blue-900 hover:text-blue-800"
                      >
                        View
                      </button>
                      
                      {leave.status === 'pending' && (
                        <>
                          <button className="ml-4 text-green-600 hover:text-green-800">
                            Approve
                          </button>
                          <button className="ml-4 text-red-600 hover:text-red-800">
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply for Leave Modal */}
      {isModalOpen && (
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Apply for Leave
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Leave Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="type"
                          name="type"
                          required
                          value={newLeave.type}
                          onChange={handleInputChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                        >
                          <option value="">Select leave type</option>
                          {leaveTypes.map(type => (
                            <option key={type.id} value={type.name}>
                              {type.name} (Available: {calculateRemainingByType(type.name)})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            required
                            value={newLeave.startDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            End Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            required
                            value={newLeave.endDate}
                            onChange={handleInputChange}
                            min={newLeave.startDate || new Date().toISOString().split('T')[0]}
                            className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                          Number of Days
                        </label>
                        <input
                          type="number"
                          name="days"
                          id="days"
                          min="1"
                          required
                          value={newLeave.days}
                          onChange={handleInputChange}
                          readOnly
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                          Reason <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="reason"
                          name="reason"
                          rows={3}
                          required
                          value={newLeave.reason}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="Please provide a reason for your leave request"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave Details Modal */}
      {selectedLeave && (
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
                        Leave Request Details
                      </h3>
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedLeave.status)}`}>
                        {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-6 space-y-6">
                      <div className="border-t border-gray-200 pt-4">
                        <dl className="divide-y divide-gray-200">
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Employee</dt>
                            <dd className="text-sm text-gray-900">{selectedLeave.employeeName}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Leave Type</dt>
                            <dd className="text-sm text-gray-900">{selectedLeave.type}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Date Range</dt>
                            <dd className="text-sm text-gray-900">{selectedLeave.startDate} to {selectedLeave.endDate}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Number of Days</dt>
                            <dd className="text-sm text-gray-900">{selectedLeave.days}</dd>
                          </div>
                          <div className="py-3 flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Applied On</dt>
                            <dd className="text-sm text-gray-900">{selectedLeave.appliedOn}</dd>
                          </div>
                          {selectedLeave.status === 'approved' && (
                            <div className="py-3 flex justify-between">
                              <dt className="text-sm font-medium text-gray-500">Approved By</dt>
                              <dd className="text-sm text-gray-900">{selectedLeave.approvedBy} on {selectedLeave.approvedOn}</dd>
                            </div>
                          )}
                          {selectedLeave.status === 'rejected' && (
                            <>
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">Rejected By</dt>
                                <dd className="text-sm text-gray-900">{selectedLeave.rejectedBy} on {selectedLeave.rejectedOn}</dd>
                              </div>
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">Rejection Reason</dt>
                                <dd className="text-sm text-gray-900">{selectedLeave.rejectionReason}</dd>
                              </div>
                            </>
                          )}
                        </dl>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Reason for Leave</h4>
                        <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedLeave.reason}</p>
                      </div>

                      {selectedLeave.status === 'pending' && (
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex space-x-3">
                            <button 
                              type="button"
                              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Check size={16} className="mr-2" />
                              Approve
                            </button>
                            <button 
                              type="button"
                              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <X size={16} className="mr-2" />
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => toggleLeaveDetailsModal()}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                {selectedLeave.status === 'approved' && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    <FileText size={16} className="mr-2" />
                    Download Approval
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavePage;