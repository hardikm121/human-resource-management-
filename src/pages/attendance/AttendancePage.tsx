import React, { useState } from 'react';
import { Calendar, Clock, Filter, Search, UserCheck, UserX, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isWeekend } from 'date-fns';

const AttendancePage: React.FC = () => {
  const [month, setMonth] = useState(new Date());
  const [filterEmployee, setFilterEmployee] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const startDate = startOfMonth(month);
  const endDate = endOfMonth(month);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Mock data for the attendance records
  const attendanceData: Record<string, {
    status: 'present' | 'absent' | 'late' | 'leave' | 'half-day', 
    checkIn?: string, 
    checkOut?: string
  }> = {
    '2025-05-01': { status: 'present', checkIn: '09:05', checkOut: '17:30' },
    '2025-05-02': { status: 'present', checkIn: '08:55', checkOut: '17:15' },
    '2025-05-03': { status: 'weekend' as any },
    '2025-05-04': { status: 'weekend' as any },
    '2025-05-05': { status: 'late', checkIn: '10:15', checkOut: '18:30' },
    '2025-05-06': { status: 'present', checkIn: '09:00', checkOut: '17:00' },
    '2025-05-07': { status: 'present', checkIn: '08:50', checkOut: '17:10' },
    '2025-05-08': { status: 'leave' },
    '2025-05-09': { status: 'leave' },
    '2025-05-10': { status: 'weekend' as any },
    '2025-05-11': { status: 'weekend' as any },
    '2025-05-12': { status: 'present', checkIn: '09:05', checkOut: '17:30' },
    '2025-05-13': { status: 'present', checkIn: '08:55', checkOut: '17:15' },
    '2025-05-14': { status: 'half-day', checkIn: '09:00', checkOut: '13:00' },
  };

  // Generate mock data for all employees
  const employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product' },
    { id: 3, name: 'Michael Johnson', position: 'UI Designer', department: 'Design' },
    { id: 4, name: 'Emily Williams', position: 'HR Specialist', department: 'Human Resources' },
    { id: 5, name: 'David Brown', position: 'Marketing Specialist', department: 'Marketing' },
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(filterEmployee.toLowerCase()) ||
    emp.position.toLowerCase().includes(filterEmployee.toLowerCase()) ||
    emp.department.toLowerCase().includes(filterEmployee.toLowerCase())
  );

  // Summary data
  const summaryData = {
    present: 18,
    absent: 2,
    late: 3,
    leave: 4,
    halfDay: 1
  };

  // Getting the day status based on date
  const getDayStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return attendanceData[dateStr]?.status || 'absent';
  };

  // Status color mapping
  const statusColors = {
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    leave: 'bg-blue-100 text-blue-800',
    'half-day': 'bg-purple-100 text-purple-800',
    weekend: 'bg-gray-100 text-gray-500'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Attendance Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Present</p>
              <p className="text-xl font-semibold">{summaryData.present}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-800 mr-4">
              <UserX size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Absent</p>
              <p className="text-xl font-semibold">{summaryData.absent}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Late</p>
              <p className="text-xl font-semibold">{summaryData.late}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">On Leave</p>
              <p className="text-xl font-semibold">{summaryData.leave}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Half Day</p>
              <p className="text-xl font-semibold">{summaryData.halfDay}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <button
              className={`px-4 py-2 rounded-md focus:outline-none ${
                viewMode === 'calendar'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon size={16} className="inline mr-2" />
              Calendar View
            </button>
            
            <button
              className={`px-4 py-2 rounded-md focus:outline-none ${
                viewMode === 'list'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setViewMode('list')}
            >
              <Filter size={16} className="inline mr-2" />
              List View
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employee..."
                value={filterEmployee}
                onChange={(e) => setFilterEmployee(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
            
            <select
              value={format(month, 'yyyy-MM')}
              onChange={(e) => {
                const [year, month] = e.target.value.split('-').map(Number);
                setMonth(new Date(year, month - 1));
              }}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date(2025, i, 1);
                return (
                  <option key={i} value={format(date, 'yyyy-MM')}>
                    {format(date, 'MMMM yyyy')}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Present
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Absent
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Late
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Leave
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            Half Day
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
            Weekend
          </span>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div>
            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-md overflow-hidden">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="bg-gray-100 text-center py-2 font-medium text-gray-600"
                >
                  {day}
                </div>
              ))}
              
              {/* Empty cells for days of the week before the first day of month */}
              {Array.from({ length: getDay(startDate) }).map((_, index) => (
                <div key={`empty-${index}`} className="bg-white p-2 h-24"></div>
              ))}
              
              {/* Days of the month */}
              {days.map((day) => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const dayStatus = isWeekend(day) ? 'weekend' : getDayStatus(day);
                const statusClass = statusColors[dayStatus as keyof typeof statusColors];
                
                return (
                  <div
                    key={dateStr}
                    className={`bg-white p-2 border-t border-l ${
                      isToday(day) ? 'ring-2 ring-blue-900' : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${isToday(day) ? 'text-blue-900' : ''}`}>
                        {format(day, 'd')}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusClass}`}>
                        {dayStatus !== 'weekend' ? dayStatus.charAt(0).toUpperCase() + dayStatus.slice(1) : 'W'}
                      </span>
                    </div>
                    
                    {attendanceData[dateStr] && attendanceData[dateStr].checkIn && (
                      <div className="mt-2 text-xs">
                        <div>IN: {attendanceData[dateStr].checkIn}</div>
                        <div>OUT: {attendanceData[dateStr].checkOut || '-'}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
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
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.flatMap(employee => {
                    // For demonstration, let's show a few records for each employee
                    return ['2025-05-01', '2025-05-02', '2025-05-05'].map(date => {
                      const record = attendanceData[date] || { status: 'absent' };
                      return (
                        <tr key={`${employee.id}-${date}`} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.checkIn || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.checkOut || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[record.status as keyof typeof statusColors]
                            }`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    });
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;