import { reactive, computed } from 'vue';

const state = reactive({
  expenses: [
    { id: 1, description: 'Software licenses', amount: 2500, category: 'Software', date: '2024-08-15', vendor: 'TechPoluru Solutions', status: 'Approved', employee: 'Sarah Poluru' },
    { id: 2, description: 'Office supplies', amount: 450, category: 'Supplies', date: '2024-08-16', vendor: 'OfficePoluru Supplies', status: 'Pending', employee: 'John Poluru' },
    { id: 3, description: 'Travel - Conference', amount: 1200, category: 'Travel', date: '2024-08-17', vendor: 'AirlinePoluru', status: 'Approved', employee: 'Michael Poluru' },
    { id: 4, description: 'Internet service', amount: 350, category: 'Utilities', date: '2024-08-18', vendor: 'ConnectPoluru ISP', status: 'Approved', employee: 'Emily Poluru' },
    { id: 5, description: 'Team lunch', amount: 280, category: 'Meals', date: '2024-08-19', vendor: 'CafePoluru', status: 'Pending', employee: 'David Poluru' },
    { id: 6, description: 'Marketing materials', amount: 890, category: 'Marketing', date: '2024-08-20', vendor: 'PrintPoluru Co', status: 'Approved', employee: 'Lisa Poluru' },
    { id: 7, description: 'Equipment purchase', amount: 3200, category: 'Equipment', date: '2024-08-21', vendor: 'TechGear Poluru', status: 'Approved', employee: 'Robert Poluru' },
    { id: 8, description: 'Professional development', amount: 600, category: 'Training', date: '2024-08-22', vendor: 'CoursesPoluru Academy', status: 'Pending', employee: 'Jessica Poluru' },
  ],
  invoices: [
    { id: 101, invoiceNumber: 'INV-2024-001', vendor: 'CloudPoluru Services', amount: 5200, dueDate: '2024-09-15', status: 'Paid', issueDate: '2024-08-15' },
    { id: 102, invoiceNumber: 'INV-2024-002', vendor: 'DataPoluru Analytics', amount: 3800, dueDate: '2024-09-20', status: 'Pending', issueDate: '2024-08-18' },
    { id: 103, invoiceNumber: 'INV-2024-003', vendor: 'SecurityPoluru Solutions', amount: 2100, dueDate: '2024-09-10', status: 'Overdue', issueDate: '2024-08-05' },
    { id: 104, invoiceNumber: 'INV-2024-004', vendor: 'SupportPoluru Inc', amount: 1500, dueDate: '2024-09-25', status: 'Pending', issueDate: '2024-08-20' },
    { id: 105, invoiceNumber: 'INV-2024-005', vendor: 'ConsultingPoluru Group', amount: 8900, dueDate: '2024-10-01', status: 'Pending', issueDate: '2024-08-22' },
  ],
  budgets: [
    { id: 1, category: 'Software', allocated: 10000, spent: 7200, remaining: 2800, status: 'On Track' },
    { id: 2, category: 'Travel', allocated: 8000, spent: 6500, remaining: 1500, status: 'At Risk' },
    { id: 3, category: 'Marketing', allocated: 12000, spent: 8900, remaining: 3100, status: 'On Track' },
    { id: 4, category: 'Supplies', allocated: 5000, spent: 3200, remaining: 1800, status: 'On Track' },
    { id: 5, category: 'Equipment', allocated: 15000, spent: 9500, remaining: 5500, status: 'On Track' },
    { id: 6, category: 'Training', allocated: 8000, spent: 2100, remaining: 5900, status: 'Excellent' },
  ],
  transactions: [
    { id: 1, date: '2024-08-25', description: 'Expense reimbursement', type: 'Credit', amount: 1250, balance: 18750 },
    { id: 2, date: '2024-08-24', description: 'Invoice payment to CloudPoluru', type: 'Debit', amount: 5200, balance: 17500 },
    { id: 3, date: '2024-08-23', description: 'Salary advance', type: 'Credit', amount: 2000, balance: 22700 },
    { id: 4, date: '2024-08-22', description: 'Equipment purchase', type: 'Debit', amount: 3200, balance: 20700 },
  ],
  employees: [
    { id: 1, name: 'Sarah Poluru', department: 'Engineering', role: 'Senior Engineer', expenses: 8 },
    { id: 2, name: 'John Poluru', department: 'Operations', role: 'Operations Manager', expenses: 12 },
    { id: 3, name: 'Michael Poluru', department: 'Sales', role: 'Sales Director', expenses: 5 },
    { id: 4, name: 'Emily Poluru', department: 'IT', role: 'IT Manager', expenses: 6 },
    { id: 5, name: 'David Poluru', department: 'HR', role: 'HR Lead', expenses: 3 },
    { id: 6, name: 'Lisa Poluru', department: 'Marketing', role: 'Marketing Manager', expenses: 4 },
    { id: 7, name: 'Robert Poluru', department: 'Finance', role: 'Finance Manager', expenses: 2 },
    { id: 8, name: 'Jessica Poluru', department: 'Engineering', role: 'Engineer', expenses: 1 },
  ],
  dashboardStats: {
    totalSpend: 42850,
    budgetUtilization: 72,
    pendingApprovals: 3,
    overdueInvoices: 1,
    monthlyTrend: [
      { month: 'Jun', amount: 35000 },
      { month: 'Jul', amount: 42000 },
      { month: 'Aug', amount: 42850 },
      { month: 'Sep', amount: 38000 },
      { month: 'Oct', amount: 45000 },
    ],
  },
});

const getters = {
  expenses: computed(() => state.expenses),
  invoices: computed(() => state.invoices),
  budgets: computed(() => state.budgets),
  transactions: computed(() => state.transactions),
  employees: computed(() => state.employees),
  pendingExpenses: computed(() => state.expenses.filter(e => e.status === 'Pending')),
  approvedExpenses: computed(() => state.expenses.filter(e => e.status === 'Approved')),
  paidInvoices: computed(() => state.invoices.filter(i => i.status === 'Paid')),
  pendingInvoices: computed(() => state.invoices.filter(i => i.status === 'Pending')),
  overdueInvoices: computed(() => state.invoices.filter(i => i.status === 'Overdue')),
  totalExpenses: computed(() => state.expenses.reduce((sum, e) => sum + e.amount, 0)),
  totalInvoiceAmount: computed(() => state.invoices.reduce((sum, i) => sum + i.amount, 0)),
  dashboardStats: computed(() => state.dashboardStats),
};

const actions = {
  addExpense(expense) {
    const newExpense = {
      id: Math.max(...state.expenses.map(e => e.id), 0) + 1,
      ...expense,
      date: new Date().toISOString().split('T')[0],
    };
    state.expenses.push(newExpense);
    return newExpense;
  },
  updateExpense(id, updates) {
    const expense = state.expenses.find(e => e.id === id);
    if (expense) Object.assign(expense, updates);
  },
  deleteExpense(id) {
    const index = state.expenses.findIndex(e => e.id === id);
    if (index > -1) state.expenses.splice(index, 1);
  },
  approveExpense(id) {
    const expense = state.expenses.find(e => e.id === id);
    if (expense) expense.status = 'Approved';
  },
  addInvoice(invoice) {
    const newInvoice = {
      id: Math.max(...state.invoices.map(i => i.id), 0) + 1,
      ...invoice,
      issueDate: new Date().toISOString().split('T')[0],
    };
    state.invoices.push(newInvoice);
    return newInvoice;
  },
  payInvoice(id) {
    const invoice = state.invoices.find(i => i.id === id);
    if (invoice) invoice.status = 'Paid';
  },
  deleteInvoice(id) {
    const index = state.invoices.findIndex(i => i.id === id);
    if (index > -1) state.invoices.splice(index, 1);
  },
  updateBudget(id, updates) {
    const budget = state.budgets.find(b => b.id === id);
    if (budget) Object.assign(budget, updates);
  },
};

export function useFinanceStore() {
  return { state, ...getters, ...actions };
}
