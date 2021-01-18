import Account from './Account';
import Expense from './Expense';
import ExpenseCategory from './ExpenseCategory';
import Income from './Income';
import IncomeCategory from './IncomeCategory';
import User from './User';

Account.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Account, { foreignKey: 'userId' });

Account.hasMany(Income, { foreignKey: 'accountId' });
Account.hasMany(Expense, { foreignKey: 'accountId' });
Account.hasMany(IncomeCategory, { foreignKey: 'accountId' });
Account.hasMany(ExpenseCategory, { foreignKey: 'accountId' });

Income.belongsTo(Account, { foreignKey: 'accountId' });
Income.belongsTo(IncomeCategory, { foreignKey: 'categoryId' });

Expense.belongsTo(Account, { foreignKey: 'accountId' });
Expense.belongsTo(ExpenseCategory, { foreignKey: 'categoryId' });

IncomeCategory.belongsTo(Account, { foreignKey: 'accountId' });
IncomeCategory.hasMany(Income, { foreignKey: 'categoryId' });

ExpenseCategory.belongsTo(Account, { foreignKey: 'accountId' });
ExpenseCategory.hasMany(Expense, { foreignKey: 'accountId' });

export { User, Account, Income, Expense, IncomeCategory, ExpenseCategory };