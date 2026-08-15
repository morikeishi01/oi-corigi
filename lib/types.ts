export interface Meal {
  icon: string;
  text: string;
  price: number;
}

export interface MealDay {
  day: string;
  items: Meal[];
}

export interface ShopItem {
  name: string;
  qty: string;
  price: number;
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  store: string;
  cat: string;
  added: string;
}

export interface BudgetData {
  expenses: Expense[];
  shopChecks: Record<string, boolean>;
}