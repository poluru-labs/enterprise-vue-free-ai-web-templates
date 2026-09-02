import { reactive } from 'vue';
import expensesSeed from '../data/expenses.json';
import invoicesSeed from '../data/invoices.json';
import budgetsSeed from '../data/budgets.json';
import vendorsSeed from '../data/vendors.json';
import notificationsSeed from '../data/notifications.json';
import overviewSeed from '../data/overview.json';
import closeSeed from '../data/close.json';

function nextExpenseId(expenses) {
  const nums = expenses.map((item) => Number(String(item.id).replace(/\D/g, '')) || 0);
  return `exp-${Math.max(1000, ...nums) + 1}`;
}

const store = reactive({
  expenses: expensesSeed.map((item) => ({ ...item })),
  invoices: invoicesSeed.map((item) => ({ ...item })),
  budgets: budgetsSeed.map((item) => ({ ...item })),
  vendors: vendorsSeed.map((item) => ({ ...item })),
  notifications: notificationsSeed.map((item) => ({ ...item, read: false })),
  overview: overviewSeed,
  close: closeSeed,
  composerOpen: false,
  sidebarOpen: false,

  get pendingExpenses() {
    return store.expenses.filter((item) => item.status === 'Pending');
  },
  get approvedExpenses() {
    return store.expenses.filter((item) => item.status === 'Approved');
  },
  get paidInvoices() {
    return store.invoices.filter((item) => item.status === 'Paid');
  },
  get pendingInvoices() {
    return store.invoices.filter((item) => item.status === 'Pending' || item.status === 'Overdue');
  },
  get overdueInvoices() {
    return store.invoices.filter((item) => item.status === 'Overdue');
  },
  get totalExpenses() {
    return store.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  },
  get totalInvoiceAmount() {
    return store.invoices.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  },
  get openInvoiceAmount() {
    return store.pendingInvoices.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  },
  get totalAllocated() {
    return store.budgets.reduce((sum, item) => sum + Number(item.allocated || 0), 0);
  },
  get totalSpent() {
    return store.budgets.reduce((sum, item) => sum + Number(item.spent || 0), 0);
  },
  get remainingBudget() {
    return store.totalAllocated - store.totalSpent;
  },
  get unreadCount() {
    return store.notifications.filter((item) => !item.read).length;
  },

  expenseById(id) {
    return store.expenses.find((item) => String(item.id) === String(id));
  },
  addExpense(payload) {
    const expense = {
      id: nextExpenseId(store.expenses),
      status: 'Pending',
      date: new Date().toISOString().slice(0, 10),
      employee: payload.employee || 'Hana Poluru',
      costCenter: payload.costCenter || 'Finance',
      notes: payload.notes || '',
      ...payload,
    };
    store.expenses.unshift(expense);
    store.composerOpen = false;
    return expense;
  },
  updateExpense(id, updates) {
    const expense = store.expenseById(id);
    if (expense) Object.assign(expense, updates);
    return expense;
  },
  deleteExpense(id) {
    const index = store.expenses.findIndex((item) => String(item.id) === String(id));
    if (index > -1) store.expenses.splice(index, 1);
  },
  approveExpense(id) {
    return store.updateExpense(id, { status: 'Approved' });
  },
  rejectExpense(id) {
    return store.updateExpense(id, { status: 'Rejected' });
  },
  payInvoice(id) {
    const invoice = store.invoices.find((item) => String(item.id) === String(id));
    if (invoice) invoice.status = 'Paid';
    return invoice;
  },
  deleteInvoice(id) {
    const index = store.invoices.findIndex((item) => String(item.id) === String(id));
    if (index > -1) store.invoices.splice(index, 1);
  },
  openComposer() {
    store.composerOpen = true;
  },
  closeComposer() {
    store.composerOpen = false;
  },
  markNotificationsRead() {
    store.notifications.forEach((item) => {
      item.read = true;
    });
  },
  setSidebarOpen(open) {
    store.sidebarOpen = open;
  },
});

export function useFinanceStore() {
  return store;
}
