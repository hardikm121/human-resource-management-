import React, { useState } from 'react';
import { BarChartIcon as ChartIcon, Star, Target, Flag, Check, Plus, UserCheck, TrendingUp, BarChart2, Filter } from 'lucide-react';
import { mockEmployees } from '../../models/employee';

// Mock performance rating scales
const ratingScale = [
  { value: 1, label: 'Poor', color: 'bg-red-100 text-red-800' },
  { value: 2, label: 'Needs Improvement', color: 'bg-orange-100 text-orange-800' },
  { value: 3, label: 'Meets Expectations', color: 'bg-yellow-100 text-yellow-800' },
  { value: 4, label: 'Exceeds Expectations', color: 'bg-green-100 text-green-800' },
  { value: 5, label: 'Outstanding', color: 'bg-blue-100 text-blue-800' }
];

// Mock performance review data
const performanceData = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    position: 'Software Engineer',
    department: 'Engineering',
    reviewPeriod: 'Q1 2025',
    overallRating: 4,
    technicalSkills: 4,
    communication: 3,
    teamwork: 4,
    productivity: 5,
    innovation: 4,
    reviewer: 'Robert Chen',
    reviewDate: '2025-03-15',
    status: 'Completed',
    strengths: 'Strong problem-solving abilities. Takes initiative to improve codebase. Excellent at debugging complex issues.',
    areasForImprovement: 'Could improve communication with non-technical team members. Needs to document code better.',
    goals: [
      { id: 1, description: 'Complete advanced JavaScript certification', status: 'In Progress', dueDate: '2025-06-30' },
      { id: 2, description: 'Mentor a junior developer', status: 'Not Started', dueDate: '2025-07-15' },
      { id: 3, description: 'Lead a technical project', status: 'Not Started', dueDate: '2025-09-30' }
    ]
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Jane Smith',
    position: 'Product Manager',
    department: 'Product',
    reviewPeriod: 'Q1 2025',
    overallRating: 5,
    technicalSkills: 4,
    communication: 5,
    teamwork: 5,
    productivity: 5,
    innovation: 5,
    reviewer: 'Maria Garcia',
    reviewDate: '2025-03-20',
    status: 'Completed',
    strengths: 'Exceptional leadership and vision. Great at communicating product roadmap. Excellent stakeholder management.',
    areasForImprovement: 'Could delegate more tasks to the team. Sometimes takes on too much responsibility.',
    goals: [
      { id: 1, description: 'Develop a new product strategy', status: 'Completed', dueDate: '2025-02-28' },
      { id: 2, description: 'Improve user satisfaction metrics by 15%', status: 'In Progress', dueDate: '2025-06-30' },
      { id: 3, description: 'Launch two new product features', status: 'In Progress', dueDate: '2025-08-15' }
    ]
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Michael Johnson',
    position: 'UI Designer',
    department: 'Design',
    reviewPeriod: 'Q1 2025',
    overallRating: 3,
    technicalSkills: 4,
    communication: 3,
    teamwork: 2,
    productivity: 3,
    innovation: 4,
    reviewer: 'Emily Rodriguez',
    reviewDate: '2025-03-18',
    status: 'Completed',
    strengths: 'Creative design solutions. Strong attention to detail. Excellent with design tools and technologies.',
    areasForImprovement: 'Needs to improve teamwork and collaboration. Should communicate design decisions more clearly.',
    goals: [
      { id: 1, description: 'Create a new design system', status: 'In Progress', dueDate: '2025-05-30' },
      { id: 2, description: 'Improve collaboration with development team', status: 'Not Started', dueDate: '2025-06-15' },
      { id: 3, description: 'Lead a design workshop for the team', status: 'Not Started', dueDate: '2025-07-30' }
    ]
  }
];

const PerformancePage: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState('Q1 2025');
  const [filterDepartment, setFilterDepartment] = useState('All Departments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerformance, setSelectedPerformance] = useState<any>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  // Departments for filter
  const departments = ['All Departments', 'Engineering', 'Product', 'Design', 'Human Resources', 'Marketing', 'Sales', 'Finance'];

  // Review periods for filter
  const reviewPeriods = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Annual 2024'];

  // Filtered performance data
  const filteredPerformance = performanceData.filter(perf => {
    const matchesPeriod = perf.reviewPeriod === filterPeriod;
    const matchesDepartment = filterDepartment === 'All Departments' || perf.department === filterDepartment;
    const matchesSearch = 
      perf.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perf.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perf.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPeriod && matchesDepartment && matchesSearch;
  });

  const handleViewReview = (performance: any) => {
    setSelectedPerformance(performance);
    setIsReviewModalOpen(true);
  };

  const getRatingLabel = (rating: number) => {
    const ratingObj = ratingScale.find(r => r.value === rating);
    return ratingObj ? ratingObj.label : '';
  };

  const getRatingColor = (rating: number) => {
    const ratingObj = ratingScale.find(r => r.value === rating);
    return ratingObj ? ratingObj.color : '';
  };

  // Calculate average ratings
  const avgOverallRating = performanceData.reduce((sum, perf) => sum + perf.overallRating, 0) / performanceData.length;
  const avgTechnicalSkills = performanceData.reduce((sum, perf) => sum + perf.technicalSkills, 0) / performanceData.length;
  const avgCommunication = performanceData.reduce((sum, perf) => sum + perf.communication, 0) / performanceData.length;
  const avgTeamwork = performanceData.reduce((sum, perf) => sum + perf.teamwork, 0) / performanceData.length;
  const avgProductivity = performanceData.reduce((sum, perf) => sum + perf.productivity, 0) / performanceData.length;
  const avgInnovation = performanceData.reduce((sum, perf) => sum + perf.innovation, 0) / performanceData.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Performance Management</h1>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900">
            <Plus size={18} className="mr-2" />
            New Review
          </button>
          <button 
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
            onClick={() => setIsGoalModalOpen(true)}
          >
            <Flag size={18} className="mr-2" />
            Add Goal
          </button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <Star size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <div className="flex items-center">
                <p className="text-xl font-semibold">{avgOverallRating.toFixed(1)}</p>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getRatingColor(Math.round(avgOverallRating))}`}>
                  {getRatingLabel(Math.round(avgOverallRating))}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Technical Skills</span>
                <span>{avgTechnicalSkills.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-900 h-1.5 rounded-full" style={{ width: `${(avgTechnicalSkills / 5) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Communication</span>
                <span>{avgCommunication.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-900 h-1.5 rounded-full" style={{ width: `${(avgCommunication / 5) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Teamwork</span>
                <span>{avgTeamwork.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-900 h-1.5 rounded-full" style={{ width: `${(avgTeamwork / 5) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Performance Trend</p>
              <p className="text-xl font-semibold">+12%</p>
            </div>
          </div>
          
          <div className="h-32 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 size={32} className="mx-auto text-gray-300" />
              <p className="mt-2 text-xs">Performance trend chart will appear here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <Target size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Goals Progress</p>
              <p className="text-xl font-semibold">63%</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Completed</span>
                <span>1/9</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>In Progress</span>
                <span>5/9</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '56%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Not Started</span>
                <span>3/9</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <h2 className="text-lg font-medium text-gray-900">Performance Reviews</h2>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
            >
              {reviewPeriods.map((period) => (
                <option key={period} value={period}>
                  {period}
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
                  Review Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Date
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
              {filteredPerformance.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No performance reviews found
                  </td>
                </tr>
              ) : (
                filteredPerformance.map((performance) => (
                  <tr key={performance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <UserCheck className="h-6 w-6 text-blue-900" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{performance.employeeName}</div>
                          <div className="text-sm text-gray-500">{performance.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {performance.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {performance.reviewPeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColor(performance.overallRating)}`}>
                        {performance.overallRating} - {getRatingLabel(performance.overallRating)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {performance.reviewDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {performance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewReview(performance)}
                        className="text-blue-900 hover:text-blue-800"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Review Modal */}
      {isReviewModalOpen && selectedPerformance && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Performance Review Details
                      </h3>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColor(selectedPerformance.overallRating)}`}>
                        {selectedPerformance.overallRating} - {getRatingLabel(selectedPerformance.overallRating)}
                      </span>
                    </div>
                    
                    <div className="mt-6">
                      <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Employee</p>
                            <p className="text-sm text-gray-900">{selectedPerformance.employeeName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Position</p>
                            <p className="text-sm text-gray-900">{selectedPerformance.position}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Department</p>
                            <p className="text-sm text-gray-900">{selectedPerformance.department}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Review Period</p>
                            <p className="text-sm text-gray-900">{selectedPerformance.reviewPeriod}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Reviewer</p>
                            <p className="text-sm text-gray-900">{selectedPerformance.reviewer}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Review Date</p>
                            <p className="text-sm text-gray-900">{selectedPerformance.reviewDate}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Ratings</h4>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Technical Skills</span>
                              <span>{selectedPerformance.technicalSkills}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-900 h-1.5 rounded-full" 
                                style={{ width: `${(selectedPerformance.technicalSkills / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Communication</span>
                              <span>{selectedPerformance.communication}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-900 h-1.5 rounded-full" 
                                style={{ width: `${(selectedPerformance.communication / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Teamwork</span>
                              <span>{selectedPerformance.teamwork}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-900 h-1.5 rounded-full" 
                                style={{ width: `${(selectedPerformance.teamwork / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Productivity</span>
                              <span>{selectedPerformance.productivity}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-900 h-1.5 rounded-full" 
                                style={{ width: `${(selectedPerformance.productivity / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Innovation</span>
                              <span>{selectedPerformance.innovation}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-900 h-1.5 rounded-full" 
                                style={{ width: `${(selectedPerformance.innovation / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Strengths</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedPerformance.strengths}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Areas for Improvement</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedPerformance.areasForImprovement}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Goals</h4>
                        <div className="space-y-2">
                          {selectedPerformance.goals.map((goal: any) => (
                            <div key={goal.id} className="flex items-start">
                              <div className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-white
                                ${goal.status === 'Completed' ? 'bg-green-500' : 
                                  goal.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-400'}`}
                              >
                                {goal.status === 'Completed' && <Check size={12} />}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-gray-900">{goal.description}</p>
                                <div className="flex text-xs text-gray-500 mt-1">
                                  <span className={`mr-2 px-1.5 py-0.5 rounded
                                    ${goal.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                      goal.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
                                  >
                                    {goal.status}
                                  </span>
                                  <span>Due: {goal.dueDate}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Print Review
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {isGoalModalOpen && (
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
                      Add Performance Goal
                    </h3>
                    
                    <form className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
                          Employee <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="employee"
                          name="employee"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                          required
                        >
                          <option value="">Select an employee</option>
                          {mockEmployees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                              {emp.firstName} {emp.lastName} - {emp.position}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="goalDescription" className="block text-sm font-medium text-gray-700">
                          Goal Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="goalDescription"
                          name="goalDescription"
                          rows={3}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                          placeholder="Describe the performance goal"
                          required
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="professional">Professional Development</option>
                          <option value="technical">Technical Skills</option>
                          <option value="leadership">Leadership</option>
                          <option value="communication">Communication</option>
                          <option value="teamwork">Teamwork</option>
                          <option value="productivity">Productivity</option>
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
                            className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                            Due Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="metrics" className="block text-sm font-medium text-gray-700">
                          Success Metrics <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="metrics"
                          name="metrics"
                          rows={2}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                          placeholder="How will progress and success be measured?"
                          required
                        ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Goal
                </button>
                <button
                  type="button"
                  onClick={() => setIsGoalModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformancePage;