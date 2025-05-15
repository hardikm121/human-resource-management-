import React, { useState } from 'react';
import { FileText, Upload, FileType2, Download, Trash, Search, Filter, FileCheck } from 'lucide-react';

// Mock document data
const documentData = [
  {
    id: 1,
    name: 'Employee Handbook',
    category: 'Company Policies',
    uploadedBy: 'HR Manager',
    uploadDate: '2025-01-15',
    fileSize: '2.5 MB',
    fileType: 'PDF',
    accessLevel: 'All Employees'
  },
  {
    id: 2,
    name: 'Code of Conduct',
    category: 'Company Policies',
    uploadedBy: 'HR Manager',
    uploadDate: '2025-01-15',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    accessLevel: 'All Employees'
  },
  {
    id: 3,
    name: 'IT Security Policy',
    category: 'IT Policies',
    uploadedBy: 'IT Manager',
    uploadDate: '2025-02-10',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    accessLevel: 'All Employees'
  },
  {
    id: 4,
    name: 'Travel Expense Form',
    category: 'Forms',
    uploadedBy: 'Finance Manager',
    uploadDate: '2025-03-05',
    fileSize: '0.5 MB',
    fileType: 'DOCX',
    accessLevel: 'All Employees'
  },
  {
    id: 5,
    name: 'Leave Application Form',
    category: 'Forms',
    uploadedBy: 'HR Manager',
    uploadDate: '2025-03-12',
    fileSize: '0.3 MB',
    fileType: 'DOCX',
    accessLevel: 'All Employees'
  },
  {
    id: 6,
    name: 'Quarterly Financial Report',
    category: 'Reports',
    uploadedBy: 'Finance Director',
    uploadDate: '2025-04-10',
    fileSize: '4.2 MB',
    fileType: 'PDF',
    accessLevel: 'Management Only'
  },
  {
    id: 7,
    name: 'Sales Presentation',
    category: 'Marketing',
    uploadedBy: 'Marketing Manager',
    uploadDate: '2025-04-15',
    fileSize: '8.7 MB',
    fileType: 'PPTX',
    accessLevel: 'Sales Team'
  }
];

// Document categories
const categories = [
  'All Categories',
  'Company Policies',
  'IT Policies',
  'Forms',
  'Reports',
  'Marketing',
  'Training',
  'Templates'
];

const DocumentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [newDocument, setNewDocument] = useState({
    name: '',
    category: '',
    file: null as File | null,
    accessLevel: 'All Employees'
  });

  // Filter documents based on search term and category
  const filteredDocuments = documentData.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument({
        ...newDocument,
        file: e.target.files[0]
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDocument({
      ...newDocument,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be code to upload the document
    setIsModalOpen(false);
    // Reset form
    setNewDocument({
      name: '',
      category: '',
      file: null,
      accessLevel: 'All Employees'
    });
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="text-green-500" />;
      case 'pptx':
      case 'ppt':
        return <FileText className="text-orange-500" />;
      default:
        return <FileType2 className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Document Repository</h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
        >
          <Upload size={18} className="mr-2" />
          Upload Document
        </button>
      </div>

      {/* Category Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Company Policies</p>
              <p className="text-xl font-semibold">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <FileCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Forms & Templates</p>
              <p className="text-xl font-semibold">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Reports</p>
              <p className="text-xl font-semibold">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Training Materials</p>
              <p className="text-xl font-semibold">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
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
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No documents found
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                          {getFileIcon(doc.fileType)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">{doc.fileType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.uploadedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-900 hover:text-blue-800 mr-4">
                        <Download size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
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
                      Upload New Document
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Document Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={newDocument.name}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-900 focus:border-blue-900 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          required
                          value={newDocument.category}
                          onChange={handleInputChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                        >
                          <option value="">Select a category</option>
                          {categories.filter(c => c !== 'All Categories').map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="accessLevel" className="block text-sm font-medium text-gray-700">
                          Access Level <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="accessLevel"
                          name="accessLevel"
                          required
                          value={newDocument.accessLevel}
                          onChange={handleInputChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                        >
                          <option value="All Employees">All Employees</option>
                          <option value="Management Only">Management Only</option>
                          <option value="HR Only">HR Only</option>
                          <option value="IT Team">IT Team</option>
                          <option value="Sales Team">Sales Team</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          File <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-900">
                                <span>Upload a file</span>
                                <input 
                                  id="file-upload" 
                                  name="file-upload" 
                                  type="file" 
                                  className="sr-only"
                                  onChange={handleFileChange}
                                  required
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, DOCX, XLS, XLSX up to 10MB
                            </p>
                            {newDocument.file && (
                              <p className="text-sm text-blue-900 font-medium">
                                Selected: {newDocument.file.name}
                              </p>
                            )}
                          </div>
                        </div>
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
                  Upload
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
    </div>
  );
};

export default DocumentsPage;