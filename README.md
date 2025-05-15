# HR Management System

A comprehensive HR Management System built with React, TypeScript, and Tailwind CSS. This system includes features for employee management, attendance tracking, leave management, payroll, performance reviews, and document management.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation Steps

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd hr-management-system
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your web browser and navigate to:
   ```
   http://localhost:5173
   ```

## Demo Credentials

Use these credentials to test different user roles:

- Admin Account:
  - Email: admin@example.com
  - Password: admin123

- HR Manager Account:
  - Email: hr@example.com
  - Password: hr123

- Employee Account:
  - Email: employee@example.com
  - Password: employee123

## Features

### 1. Authentication
- Secure login system
- Role-based access control
- Session management

### 2. Dashboard
- Overview of key metrics
- Recent activities
- Upcoming events
- Performance indicators

### 3. Employee Management
- Employee directory
- Employee profiles
- Add/Edit employee information
- Department management

### 4. Attendance Management
- Daily attendance tracking
- Attendance reports
- Late arrival tracking
- Leave management

### 5. Leave Management
- Leave requests
- Leave approval workflow
- Leave balance tracking
- Different leave types

### 6. Payroll Management
- Salary processing
- Payslip generation
- Deductions management
- Tax calculations

### 7. Performance Management
- Performance reviews
- Goal setting
- Skills assessment
- Rating system

### 8. Document Management
- Document upload/download
- Document categorization
- Access control
- Version tracking

## Project Structure

```
hr-management-system/
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   ├── contexts/
│   ├── models/
│   ├── pages/
│   │   ├── auth/
│   │   ├── attendance/
│   │   ├── documents/
│   │   ├── employees/
│   │   ├── leave/
│   │   ├── payroll/
│   │   └── performance/
│   └── main.tsx
├── public/
├── package.json
└── README.md
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs the linter to check for code issues

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context
- **Routing**: React Router
- **Build Tool**: Vite
- **Code Quality**: ESLint
- **Date Handling**: date-fns
- **Charts**: Chart.js with react-chartjs-2
- **PDF Generation**: jsPDF

## Browser Support

The application is tested and supported on the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use functional components with hooks
   - Maintain consistent naming conventions
   - Write self-documenting code

2. **Component Structure**
   - Keep components focused and single-responsibility
   - Use common components for reusability
   - Implement proper prop typing
   - Handle error cases and loading states

3. **State Management**
   - Use React Context for global state
   - Keep component state local when possible
   - Implement proper error handling
   - Maintain loading states for async operations

4. **Performance**
   - Implement proper memoization
   - Optimize re-renders
   - Lazy load routes and components
   - Follow React best practices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.