export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  manager?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  documents?: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    url: string;
  }[];
}

// Mock data for demonstration
export const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    position: 'Software Engineer',
    department: 'Engineering',
    hireDate: '2023-01-15',
    salary: 95000,
    status: 'active',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    }
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    position: 'Product Manager',
    department: 'Product',
    hireDate: '2022-06-10',
    salary: 110000,
    status: 'active',
    manager: 'Lisa Johnson'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phone: '(555) 456-7890',
    position: 'UI Designer',
    department: 'Design',
    hireDate: '2023-03-22',
    salary: 85000,
    status: 'on_leave',
    manager: 'Robert Chen'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.w@example.com',
    phone: '(555) 234-5678',
    position: 'HR Specialist',
    department: 'Human Resources',
    hireDate: '2021-11-05',
    salary: 75000,
    status: 'active',
    manager: 'Maria Garcia'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.b@example.com',
    phone: '(555) 876-5432',
    position: 'Marketing Specialist',
    department: 'Marketing',
    hireDate: '2022-08-18',
    salary: 72000,
    status: 'active',
    manager: 'Thomas Wilson'
  }
];

export const getEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees);
    }, 1000);
  });
};

export const getEmployeeById = (id: string): Promise<Employee | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employee = mockEmployees.find(emp => emp.id === id);
      resolve(employee);
    }, 500);
  });
};