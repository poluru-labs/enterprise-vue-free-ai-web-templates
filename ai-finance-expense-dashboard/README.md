# AI Finance & Expense Dashboard

A modern, feature-rich financial management dashboard built with Vue 3, Vite, and the Enterprise Design System. This dashboard provides comprehensive tools for expense tracking, invoice management, budget allocation, and financial analytics.

## Features

### 📊 Dashboard Overview
- **Key Financial Metrics**: Real-time display of total spend MTD, pending approvals, open invoices, and budget usage
- **Recent Activity**: Track the latest expenses with employee names, amounts, and approval status
- **Invoice Summary**: Quick overview of paid, pending, and overdue invoices
- **Budget Allocation**: Visual representation of budget distribution across categories
- **Golden Theme**: Professional UI with #FFCE45 accent color throughout

### 💰 Expense Management
- **Full CRUD Operations**: Create, read, update, and delete expenses
- **Advanced Filtering**: Search by description/vendor and filter by status (Pending/Approved/Rejected) and category
- **Status Tracking**: Pending, Approved, and Rejected expense statuses
- **Bulk Approval**: Quick action buttons to approve pending expenses
- **Employee Tracking**: All expenses linked to employees (names ending with "Poluru")
- **Category Organization**: Expenses organized by spending category (Travel, Office Supplies, Internet, etc.)

### 📄 Invoice Management
- **Invoice Tracking**: Monitor vendor invoices with issue dates, due dates, and payment status
- **Status Indicators**: Visual badges for Paid, Pending, and Overdue statuses
- **Overdue Highlighting**: Automatic highlighting of overdue invoices for quick identification
- **Payment Processing**: Mark invoices as paid with one click
- **Vendor Management**: Track spending by vendor (vendor names ending with "Poluru")
- **Payment History**: Complete invoice record with payment tracking

### 💼 Budget Management
- **Budget Allocation**: View total allocated budget, spent amount, and remaining balance
- **Category Budgets**: Individual budget cards for each spending category (Travel, Software, Hardware, etc.)
- **Progress Visualization**: Color-coded progress bars showing budget utilization
  - Green: Normal (0-70% utilized)
  - Yellow: Warning (70-90% utilized)
  - Red: Danger (90%+ utilized)
- **Over-Budget Alerts**: Automatic alerts when spending exceeds allocated budget
- **Budget Breakdown**: Comprehensive view of all categories with spend percentages
- **Status Badges**: Visual status indicators (Excellent, On Track, At Risk)

### 📈 Financial Analytics
- **Spending Trends**: Monthly spend visualization showing spending patterns over time
- **Expense Analysis**: Breakdown of expenses by category with amounts
- **Invoice Status Distribution**: Visual distribution of invoice statuses
- **Top Spenders**: Ranking of employees by total expense amount
- **Key Metrics**: Approval rates, average expenses, and budget utilization percentages
- **Budget vs Actual**: Overview of budget allocation vs actual spending across all categories

### 🧭 Navigation
- **Sticky Header**: Always-visible top navigation with primary action links
- **Sidebar Navigation**: Quick access to all dashboard sections:
  - Overview: Dashboard home with key metrics
  - Expenses: Expense management and approval
  - Invoices: Vendor invoice tracking
  - Budgets: Budget allocation and monitoring
  - Analytics: Financial insights and reporting
- **Responsive Design**: Seamless experience on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework**: Vue 3.5+
- **Build Tool**: Vite 6+
- **Routing**: Vue Router 4.4+
- **UI Components**: @poluru-labs/enterprise-design-system-vue 1.0+
- **CSS Framework**: Bootstrap 5.3+
- **Icons**: Bootstrap Icons 1.11+
- **Font**: Plus Jakarta Sans (Google Fonts)
- **Runtime**: Node.js 20+

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
```bash
cd ai-finance-expense-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5196`

### Production Build

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Build

```bash
npm run preview
```

Preview the production build locally.

## Project Structure

```
src/
├── App.vue                 # Main application component with sticky header
├── main.js                 # Application entry point with Vue and Router setup
├── router.js               # Vue Router configuration and route definitions
├── store.js                # Centralized state management with financial data
├── style.css               # Global styles with #FFCE45 theme
└── pages/
    ├── Overview.vue        # Dashboard home with financial metrics
    ├── Expenses.vue        # Expense management interface
    ├── Invoices.vue        # Invoice tracking and management
    ├── Budgets.vue         # Budget allocation and monitoring
    └── Analytics.vue       # Financial analytics and reporting
```

## Data & Sample Information

### Sample Employees
All employee names end with "Poluru":
- Sarah Poluru
- John Poluru
- Michael Poluru
- Emily Poluru
- David Poluru
- Lisa Poluru
- Robert Poluru
- Jessica Poluru

### Sample Vendors
All vendor names end with "Poluru":
- TechPoluru Solutions
- OfficePoluru Supplies
- AirlinePoluru
- ConnectPoluru ISP
- CafePoluru
- PrintPoluru Co
- TechGear Poluru
- CoursesPoluru Academy

### Spending Categories
- Travel
- Office Supplies
- Internet
- Meals
- Software
- Hardware
- Professional Services
- Training

## Customization

### Theme Color
The dashboard uses `#FFCE45` as the primary theme color. To change:

1. **CSS Variables**: Edit `src/style.css`
```css
:root {
  --primary: #FFCE45;      /* Change primary color */
  --primary-dark: #FFB700; /* Change primary dark variant */
}
```

2. **Component Styling**: Update color references in individual page components

### Sample Data
To modify sample data:

1. **Edit `src/store.js`** to add/modify:
   - Employee names and data
   - Expense records
   - Invoice data
   - Budget allocations
   - Transaction history

### Adding New Pages
1. Create new Vue component in `src/pages/`
2. Add route in `src/router.js`
3. Add navigation link in `src/App.vue`

## Component Library

The dashboard uses selected components from `@poluru-labs/enterprise-design-system-vue`:

- **Card**: Container component for content sections
- **Button**: Action buttons with consistent styling
- **Stat**: Metric display component
- **Alert**: Information and warning messages
- **EdsThemeProvider**: Global theme provider
- **ToastProvider**: Toast notification system

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Performance

- **Bundle Size**: ~140KB (minified JS)
- **CSS Size**: ~400KB (bootstrap + custom styles)
- **Load Time**: <2s on standard connection

## Key Features Implementation

### Real-time State Management
Centralized store with reactive data and computed getters for:
- Filtering expenses by status
- Calculating budget utilization percentages
- Aggregating financial metrics

### Form Handling
Native HTML form elements with Vue bindings for:
- Expense creation and editing
- Invoice payment processing
- Budget updates

### Responsive Design
Mobile-first approach with:
- Sticky header with responsive navigation
- Collapsible sidebar on mobile
- Flexible grid layouts
- Touch-friendly button sizes

### Data Validation
Client-side validation for:
- Required fields
- Amount validation (positive numbers)
- Date validation
- Duplicate prevention

## Security Notes

- All data is stored locally in component state
- No backend API calls in this template
- For production, integrate with your backend API
- Implement proper authentication and authorization
- Use HTTPS for all communications
- Validate all inputs on the server side

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Future Enhancements

- Backend API integration
- User authentication and authorization
- Database persistence
- Advanced chart library integration
- Export to PDF/Excel
- Email notifications
- Mobile app version
- Multi-currency support
- Advanced reporting and forecasting

## License

This template is part of the @poluru-labs/enterprise-design-system-vue ecosystem.

## Release Notes

### Version 1.0.0
- ✨ Initial release with 5 comprehensive dashboard pages
- 💰 Full expense management with CRUD operations
- 📄 Complete invoice tracking system
- 💼 Budget allocation and monitoring
- 📈 Financial analytics and reporting
- 🎨 Professional UI with #FFCE45 golden theme
- 📱 Responsive design for all devices
- ⚡ Built with Vue 3 and Vite for optimal performance
